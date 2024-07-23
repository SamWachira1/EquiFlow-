# app/api/transactions_routes.py
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Transaction, Security

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/', methods=['GET'])
@login_required
def get_transactions():
    transactions = db.session.query(
        Transaction.id,
        Transaction.shares,
        Transaction.transaction_date,
        Transaction.transaction_price,
        Transaction.transaction_type,
        Security.name,
        Security.symbol
    ).join(Security, Transaction.security_id == Security.id).filter(
        Transaction.user_id == current_user.id
    ).order_by(Transaction.transaction_date.desc()).limit(10).all()

    transactions_list = [
        {
            'id': transaction.id,
            'shares': transaction.shares,
            'transaction_date': transaction.transaction_date,
            'transaction_price': transaction.transaction_price,
            'transaction_type': transaction.transaction_type,
            'name': transaction.name,
            'symbol': transaction.symbol
        }
        for transaction in transactions
    ]
    return jsonify(transactions_list), 200
