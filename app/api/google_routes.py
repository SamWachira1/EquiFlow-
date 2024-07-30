# app/api/google_auth_routes.py
import os
from flask import Blueprint, request, redirect, url_for, session, abort, jsonify
from flask_login import current_user, login_user
from app.models import User, db
from app.auth import oauth, google

google_auth_routes = Blueprint('google_auth', __name__)

@google_auth_routes.route('/google-login')
def google_login():
    """
    Initiates Google OAuth login flow.
    """
    redirect_uri = url_for('google_auth.google_callback', _external=True)
    return google.authorize_redirect(redirect_uri)

@google_auth_routes.route('/google-callback')
def google_callback():
    """
    Handles Google OAuth callback.
    """
    try:
        # Ensure the code parameter is present
        code = request.args.get('code')
        if not code:
            raise ValueError("Missing 'code' parameter in the callback")

        # Fetch the token using the code
        token = google.authorize_access_token()

        # Extract user information from the token
        user_info = token.get('userinfo')
        if user_info:
            email = user_info['email']
            user = User.query.filter_by(email=email).first()

            if user is None:
                user = User(
                    username=user_info['name'],
                    email=email,
                    password='password',  # Set a default password
                    buying_power=0.0
                )
                db.session.add(user)
                db.session.commit()

            login_user(user)
            return redirect(url_for('auth.authenticate'))
    except Exception as e:
        print(f"Error during OAuth callback: {e}")
        return jsonify({'errors': {'message': 'Failed to authenticate'}}), 401

@google_auth_routes.route('/auth')
def auth():
    try:
        token = google.authorize_access_token()
        session['user'] = token['userinfo']
        return redirect('/')
    except Exception as e:
        print(f"Error during authentication: {e}")
        return jsonify({'errors': {'message': 'Authentication failed'}}), 401
