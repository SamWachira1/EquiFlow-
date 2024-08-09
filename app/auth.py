import os
from authlib.integrations.flask_client import OAuth

# Initialize OAuth
oauth = OAuth()

def init_oauth(app):
    oauth.init_app(app)  # Correct initialization with the app
    oauth.register(
        name='google',
        client_id=os.getenv('GOOGLE_CLIENT_ID'),
        client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
        access_token_url='https://oauth2.googleapis.com/token',
        authorize_url='https://accounts.google.com/o/oauth2/auth',
        client_kwargs={'scope': 'openid email profile'},
    )
print(f"GOOGLE_CLIENT_ID: {os.getenv('GOOGLE_CLIENT_ID')}")
print(f"GOOGLE_CLIENT_SECRET: {os.getenv('GOOGLE_CLIENT_SECRET')}")
