from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Holding, Transaction
from datetime import datetime
import pytz

holding_routes = Blueprint('holdings', __name__)

@holding_routes.route('/', methods=['GET'])
@login_required
def get_holdings():
    holdings = Holding.query.filter_by(user_id=current_user.id).all()
    return jsonify([holding.to_dict() for holding in holdings]), 200

@holding_routes.route('/buy', methods=['POST'])
@login_required
def create_holding():
    data = request.get_json()
    security_id = data.get('security_id')
    shares = data.get('shares')
    purchase_price = data.get('purchase_price')

    est = pytz.timezone('US/Eastern')
    purchase_date = datetime.now(est)

    holding = Holding.query.filter_by(user_id=current_user.id, security_id=security_id).first()
    if holding:
        holding.shares += shares
        holding.purchase_price = purchase_price  # Update purchase price to the latest buy price
    else:
        holding = Holding(
            user_id=current_user.id,
            security_id=security_id,
            shares=shares,
            purchase_price=purchase_price,
            purchase_date=purchase_date
        )
        db.session.add(holding)

    transaction = Transaction(
        user_id=current_user.id,
        security_id=security_id,
        shares=shares,
        transaction_type='buy',
        transaction_price=purchase_price,
        transaction_date=purchase_date
    )
    db.session.add(transaction)

    current_user.buying_power -= shares * purchase_price
    db.session.commit()
    return jsonify({'holding': holding.to_dict(), 'buying_power': current_user.buying_power}), 201

@holding_routes.route('/sell', methods=['POST'])
@login_required
def sell_holding():
    data = request.get_json()
    security_id = data.get('security_id')
    shares_to_sell = data.get('shares')
    sell_price = data.get('sell_price')

    holding = Holding.query.filter_by(user_id=current_user.id, security_id=security_id).first()
    if not holding or holding.shares < shares_to_sell:
        return jsonify({'error': 'Not enough shares to sell'}), 400

    est = pytz.timezone('US/Eastern')
    transaction_date = datetime.now(est)

    # Create a sell transaction
    transaction = Transaction(
        user_id=current_user.id,
        security_id=security_id,
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
