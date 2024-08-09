import os
import redis
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default_secret_key')  # Ensure a default is set for development
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True

    # Redis Cache Configuration
    redis_scheme = 'rediss' if os.getenv('REDIS_USE_TLS', 'False') == 'True' else 'redis'
    redis_user = os.getenv('REDIS_USER')
    redis_password = os.getenv('REDIS_PASSWORD')
    redis_host = os.getenv('REDIS_HOST')
    redis_port = os.getenv('REDIS_PORT', 6379)

    CACHE_TYPE = 'redis'
    REDIS_URL = f"{redis_scheme}://{redis_user}:{redis_password}@{redis_host}:{redis_port}"
    REDIS_PASSWORD = redis_password
    REDIS_DB = 0
    REDIS_HOST = redis_host
    REDIS_PORT = redis_port
    REDIS_USE_TLS = os.environ.get('REDIS_USE_TLS', 'False') == 'True'

    # Session Configuration
    SESSION_TYPE = 'redis'  # Use Redis for session management
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True  # Use a secure cookie
    SESSION_KEY_PREFIX = 'session:'  # Optional, to prefix session keys in Redis
    SESSION_REDIS = redis.from_url(REDIS_URL)
    SESSION_COOKIE_SECURE = os.getenv('FLASK_ENV') == 'production'  # Set secure cookies in production
    SESSION_COOKIE_NAME = 'equiflow'  # Optional, custom session cookie name

    # Set session cookie settings for production
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
