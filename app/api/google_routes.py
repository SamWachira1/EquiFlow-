import os
import logging
import secrets  # Import the secrets module
from flask import Blueprint, request, redirect, url_for, session, jsonify
from flask_login import current_user, login_user
from app.models import User, db
from app.auth import oauth

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

google_auth_routes = Blueprint('google_auth', __name__)

# app/api/google_routes.py
import secrets
@google_auth_routes.route('/google-login')
def google_login():
    state = secrets.token_urlsafe(16)
    session['oauth_state'] = state  # Store state in session
    redirect_uri = url_for('google_auth.google_callback', _external=True)
    return oauth.google.authorize_redirect(redirect_uri, state=state)

@google_auth_routes.route('/google-callback')
def google_callback():
    """
    Handles Google OAuth callback.
    """
    try:
        state_in_session = session.get('_state')
        state_in_request = request.args.get('state')
        logger.debug(f"Session state: {state_in_session}, Request state: {state_in_request}")
        
        # Ensure the state matches
        if state_in_session != state_in_request:
            logger.error('State mismatch: possible CSRF attack.')
            return jsonify({'errors': {'message': 'State mismatch: possible CSRF attack'}}), 401

        # Fetch the token using the code
        token = oauth.google.authorize_access_token()
        logger.debug(f"Received token: {token}")
        
        if not token:
            logger.error('No token received. Possible issues: invalid authorization code, client secret mismatch, etc.')
            return jsonify({'errors': {'message': 'Failed to authenticate'}}), 401
        
        # Extract user information from the token
        user_info = token.get('userinfo')
        logger.debug(f"User info: {user_info}")
        
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
            session['user_token'] = token.get('access_token')
            return redirect('/')
        else:
            logger.error('Failed to retrieve user information')
            return jsonify({'error': 'Failed to retrieve user information'}), 401
    except Exception as e:
        logger.error(f"Error during OAuth callback: {e}")
        return jsonify({'errors': {'message': 'Failed to authenticate'}}), 401
