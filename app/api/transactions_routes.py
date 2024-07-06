from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Transaction

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/', methods=['GET'])
@login_required
def get_transactions():
    transactions = Transaction.query.filter_by(user_id=current_user.id).all()
    return jsonify([transaction.to_dict() for transaction in transactions]), 200
