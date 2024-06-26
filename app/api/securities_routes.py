from flask import Blueprint, request, jsonify
from app.models import Security, db
from flask_login import login_required
from datetime import datetime

import requests
import os 

STOCKDATAORG_API_KEY = os.getenv('STOCKDATAORG_API_KEY')

securities_routes = Blueprint('securities', __name__)


@securities_routes.route('/<symbol>', methods=['GET'])
@login_required
def get_stock(symbol):
    try:
        # Fetch stock data from StockData API
        response = requests.get(
            f'https://api.stockdata.org/v1/data/quote?symbols={symbol}&api_token={STOCKDATAORG_API_KEY}'
        )
        response.raise_for_status()

        stock_data = response.json()

        # Check if the stock data is valid
        if not stock_data or 'data' not in stock_data:
            return jsonify({'error': 'Invalid stock data received'}), 400

        # Extract relevant stock data
        stock_info = stock_data['data'][0]

        return jsonify({
            'symbol': stock_info['ticker'],
            'name': stock_info['name'],
            'exchange_short': stock_info.get('exchange_short', 'N/A'),
            'exchange_long': stock_info.get('exchange_long', 'N/A'),
            'mic_code': stock_info.get('mic_code', 'N/A'),
            'currency': stock_info.get('currency', 'N/A'),
            'price': stock_info.get('price', 'N/A'),
            'day_high': stock_info.get('day_high', 'N/A'),
            'day_low': stock_info.get('day_low', 'N/A'),
            'day_open': stock_info.get('day_open', 'N/A'),
            '52_week_high': stock_info.get('52_week_high', 'N/A'),
            '52_week_low': stock_info.get('52_week_low', 'N/A'),
            'market_cap': stock_info.get('market_cap', 'N/A'),
            'previous_close_price': stock_info.get('previous_close_price', 'N/A'),
            'previous_close_price_time': stock_info.get('previous_close_price_time', 'N/A'),
            'day_change': stock_info.get('day_change', 'N/A'),
            'volume': stock_info.get('volume', 'N/A'),
            'is_extended_hours_price': stock_info.get('is_extended_hours_price', 'N/A'),
            'last_trade_time': stock_info.get('last_trade_time', 'N/A')
        })
    except requests.exceptions.RequestException as e:
        print(f"Error fetching stock data: {e}")
        return jsonify({'error': 'Failed to fetch stock data'}), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

@securities_routes.route('/historical/<symbol>', methods=['GET'])
def get_historical_data(symbol):
    today = datetime.now()
    five_years_ago = today.replace(year=today.year - 5)
    date_from = five_years_ago.strftime('%Y-%m-%d')
    date_to = today.strftime('%Y-%m-%d')

    try:
        response = requests.get(
            f'https://api.stockdata.org/v1/data/intraday/adjusted?symbols={symbol}&api_token={STOCKDATAORG_API_KEY}&date_from={date_from}&date_to={date_to}'
        )
        if response.status_code != 200:
            return jsonify({'error': 'Failed to fetch historical data'}), response.status_code
        
        data = response.json()
        return data
    except Exception as e:
        return jsonify({'error': str(e)}), 500
