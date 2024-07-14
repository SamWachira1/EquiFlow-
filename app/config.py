import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here (for production)
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True
    
    # Redis Cache Configuration
    CACHE_TYPE = 'redis'
    CACHE_REDIS_URL = os.environ.get('REDIS_URL')
    CACHE_REDIS_PASSWORD = os.environ.get('REDIS_PASSWORD')
    CACHE_REDIS_DB = 0
    CACHE_REDIS_HOST = os.environ.get('REDIS_HOST')
    CACHE_REDIS_PORT = os.environ.get('REDIS_PORT', 6379)
    CACHE_REDIS_TLS = os.environ.get('REDIS_USE_TLS', 'False') == 'True'
