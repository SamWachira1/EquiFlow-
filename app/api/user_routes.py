from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/update-buying-power', methods=['PUT'])
@login_required
def update_buying_power():
    amount = request.json.get('amount')
    if amount is None:
        return jsonify({"error": "Amount is required"}), 400

    current_user.buying_power += amount
    db.session.commit()
    return jsonify(current_user.to_dict()), 200
