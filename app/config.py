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

    redis_scheme = 'rediss' if os.getenv('REDIS_USE_TLS', 'False') == 'True' else 'redis'
    redis_user = os.getenv('REDIS_USER')
    redis_password = os.getenv('REDIS_PASSWORD')
    redis_host = os.getenv('REDIS_HOST')
    redis_port = os.getenv('REDIS_PORT', 6379)

    
    CACHE_TYPE = 'redis'
    REDIS_URL = f"{redis_scheme}://{redis_user}:{redis_password}@{redis_host}:{redis_port}"
    REDIS_PASSWORD = os.environ.get('REDIS_PASSWORD')
    REDIS_DB = 0
    REDIS_HOST = os.environ.get('REDIS_HOST')
    REDIS_PORT = os.environ.get('REDIS_PORT', 6379)
    REDIS_USE_TLS = os.environ.get('REDIS_USE_TLS', 'False') == 'True'

   