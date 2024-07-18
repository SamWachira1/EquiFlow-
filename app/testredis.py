import os
from dotenv import load_dotenv
import redis

# Load environment variables from .env file
load_dotenv()

# Debug: Print environment variables to verify they are loaded correctly
print("Loaded environment variables:")
print(f"DATABASE_URL: {os.getenv('DATABASE_URL')}")
print(f"SECRET_KEY: {os.getenv('SECRET_KEY')}")
print(f"SCHEMA: {os.getenv('SCHEMA')}")
print(f"EODHD_API_KEY: {os.getenv('EODHD_API_KEY')}")
print(f"REDIS_HOST: {os.getenv('REDIS_HOST')}")
print(f"REDIS_PORT: {os.getenv('REDIS_PORT')}")
print(f"REDIS_USER: {os.getenv('REDIS_USER')}")
print(f"REDIS_PASSWORD: {os.getenv('REDIS_PASSWORD')}")
print(f"REDIS_USE_TLS: {os.getenv('REDIS_USE_TLS')}")
print(f"REDIS_URL: {os.getenv('REDIS_URL')}")  # Debugging line

# Get Redis URL from environment variable
# Construct the Redis URL
redis_scheme = 'rediss' if os.getenv('REDIS_USE_TLS', 'False') == 'True' else 'redis'
redis_user = os.getenv('REDIS_USER')
redis_password = os.getenv('REDIS_PASSWORD')
redis_host = os.getenv('REDIS_HOST')
redis_port = os.getenv('REDIS_PORT', 6379)

# Construct the Redis URL
redis_url = f"{redis_scheme}://{redis_user}:{redis_password}@{redis_host}:{redis_port}"
print(f"REDIS_URL: {redis_url}")  # Debugging line

try:
    # Create a Redis client with SSL if the URL scheme is 'rediss'
    if redis_url.startswith('rediss://'):
        redis_client = redis.StrictRedis.from_url(
            redis_url,
            decode_responses=True
        )
    else:
        redis_client = redis.StrictRedis.from_url(
            redis_url.replace('redis://', 'rediss://'),
            decode_responses=True
        )

    # Test the connection
    response = redis_client.ping()
    if response:
        print("Connected to Redis")
    else:
        print("Failed to connect to Redis")
except Exception as e:
    print(f"Error: {e}")
