# app/auth.py
import os
from authlib.integrations.flask_client import OAuth

# Initialize OAuth
oauth = OAuth()

# Register Google OAuth client
google = oauth.register(
    name='google',
    client_id=os.getenv('GOOGLE_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    access_token_url='https://oauth2.googleapis.com/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    redirect_uri=os.getenv('GOOGLE_REDIRECT_URI'),  # Set this in your .env file
    client_kwargs={'scope': 'openid email profile'}
)

def init_oauth(app):
    """
    Initialize the OAuth object with the Flask app.
    """
    oauth.init_app(app)
