from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Holding, Transaction, Security
from datetime import datetime, timedelta
import pytz
import requests
import os
import io
import csv

EODHD_API_KEY = os.getenv('EODHD_API_KEY')

holding_routes = Blueprint('holdings', __name__)

def fetch_yahoo_style_data(symbol, from_date, to_date, period='d', interval=None):
    try:
        a = from_date.month - 1
        b = from_date.day
        c = from_date.year
        d = to_date.month - 1
        e = to_date.day
        f = to_date.year

        if interval:
            url = f'https://eodhd.com/api/intraday/{symbol}.US?interval={interval}&api_token={EODHD_API_KEY}&fmt=csv'
        else:
            url = f'https://eodhd.com/api/table.csv?s={symbol}&a={a:02d}&b={b:02d}&c={c}&d={d:02d}&e={e:02d}&f={f}&g={period}&api_token={EODHD_API_KEY}&fmt=json'
        
        response = requests.get(url)
        response.raise_for_status()  # This will raise an HTTPError for bad responses

        if interval:
            # Parse CSV data
            csv_file = io.StringIO(response.text)
            reader = csv.DictReader(csv_file)
            data = [row for row in reader]
            last_trading_day = from_date.date()
            filtered_data = [d for d in data if datetime.strptime(d['Datetime'], "%Y-%m-%d %H:%M:%S").date() == last_trading_day]
            return filtered_data  # Directly return data
        else:
            return response.json()
    except requests.exceptions.RequestException as e:
        print(f'Error fetching data for {symbol}: {str(e)}')
        raise
    

@holding_routes.route('/', methods=['GET'])
@login_required
def get_holdings():
    holdings = (
        db.session.query(Holding, Security)
        .join(Security, Holding.security_id == Security.id)
        .filter(Holding.user_id == current_user.id)
        .all()
    )

    holdings_data = [
        {
            'id': holding.id,
            'user_id': holding.user_id,
            'security_id': holding.security_id,
            'purchase_date': holding.purchase_date,
            'purchase_price': holding.purchase_price,
            'shares': holding.shares,
            'symbol': security.symbol,
        }
        for holding, security in holdings
    ]

    return jsonify(holdings_data), 200

@holding_routes.route('/buy', methods=['POST'])
@login_required
def create_holding():
    data = request.get_json()
    stock_symbol = data.get('stock_symbol')
    stock_name = data.get('stock_name')
    shares = data.get('shares')
    purchase_price = data.get('purchase_price')

    est = pytz.timezone('US/Eastern')
    purchase_date = datetime.now(est)

    try:
        # Check if the stock already exists in the securities table
        stock = Security.query.filter_by(symbol=stock_symbol).first()
        if not stock:
            # Add the stock to the securities table
            stock = Security(symbol=stock_symbol, name=stock_name)
            db.session.add(stock)
            db.session.commit()
        
        # Get the stock ID after committing the new stock
        stock_id = stock.id

        holding = Holding.query.filter_by(user_id=current_user.id, security_id=stock_id).first()
        if holding:
            holding.shares += shares
            holding.purchase_price = purchase_price  # Update purchase price to the latest buy price
        else:
            holding = Holding(
                user_id=current_user.id,
                security_id=stock_id,
                shares=shares,
                purchase_price=purchase_price,
                purchase_date=purchase_date
            )
            db.session.add(holding)

        transaction = Transaction(
            user_id=current_user.id,
            security_id=stock_id,
            shares=shares,
            transaction_type='buy',
            transaction_price=purchase_price,
            transaction_date=purchase_date
        )
        db.session.add(transaction)

        current_user.buying_power -= shares * purchase_price
        db.session.commit()
        return jsonify({'holding': holding.to_dict(), 'buying_power': current_user.buying_power}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@holding_routes.route('/sell', methods=['POST'])
@login_required
def sell_holding():
    data = request.get_json()
    stock_symbol = data.get('stock_symbol')
    shares_to_sell = data.get('shares')
    sell_price = data.get('sell_price')

    try:
        # Check if the stock already exists in the securities table
        stock = Security.query.filter_by(symbol=stock_symbol).first()
        if not stock:
            return jsonify({'error': 'Stock does not exist'}), 400
        
        stock_id = stock.id

        holding = Holding.query.filter_by(user_id=current_user.id, security_id=stock_id).first()
        if not holding or holding.shares < shares_to_sell:
            return jsonify({'error': 'Not enough shares to sell'}), 400

        est = pytz.timezone('US/Eastern')
        transaction_date = datetime.now(est)

        # Create a sell transaction
        transaction = Transaction(
            user_id=current_user.id,
            security_id=stock_id,
            shares=shares_to_sell,
            transaction_type='sell',
            transaction_price=sell_price,
            transaction_date=transaction_date
        )
        db.session.add(transaction)

        # Update the holding
        holding.shares -= shares_to_sell
        if holding.shares == 0:
            db.session.delete(holding)
        current_user.buying_power += shares_to_sell * sell_price
        db.session.commit()

        return jsonify({'holding': holding.to_dict(), 'buying_power': current_user.buying_power}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@holding_routes.route('/combined_historical_data_1w', methods=['GET'])
@login_required
def get_combined_historical_data_1w():
    return get_combined_historical_data_for_range(weeks=1)

@holding_routes.route('/combined_historical_data_1m', methods=['GET'])
@login_required
def get_combined_historical_data_1m():
    return get_combined_historical_data_for_range(months=1)

@holding_routes.route('/combined_historical_data_3m', methods=['GET'])
@login_required
def get_combined_historical_data_3m():
    return get_combined_historical_data_for_range(months=3)

@holding_routes.route('/combined_historical_data_ytd', methods=['GET'])
@login_required
def get_combined_historical_data_ytd():
    from_date = datetime(datetime.now().year, 1, 1)
    to_date = datetime.now()
    return get_combined_historical_data_for_dates(from_date, to_date)

@holding_routes.route('/combined_historical_data_1y', methods=['GET'])
@login_required
def get_combined_historical_data_1y():
    return get_combined_historical_data_for_range(years=1)

def get_combined_historical_data_for_range(weeks=0, months=0, years=0):
    from_date = datetime.now() - timedelta(weeks=weeks) if weeks else datetime.now().replace(year=datetime.now().year - years, month=datetime.now().month - months)
    to_date = datetime.now()
    return get_combined_historical_data_for_dates(from_date, to_date)

def get_combined_historical_data_for_dates(from_date, to_date):
    holdings = db.session.query(Holding, Security).join(Security, Holding.security_id == Security.id).filter(Holding.user_id == current_user.id).all()
    combined_data = {}

    for holding, security in holdings:
        symbol = security.symbol
        try:
            historical_data = fetch_yahoo_style_data(symbol, from_date, to_date)
            if isinstance(historical_data, list):
                for data in historical_data:
                    date = data['date']
                    if date not in combined_data:
                        combined_data[date] = {symbol: data}
                    else:
                        combined_data[date][symbol] = data
            else:
                raise Exception(f'Invalid data format for {symbol}')

        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return jsonify(combined_data), 200
