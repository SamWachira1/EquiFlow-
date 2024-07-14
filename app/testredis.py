import os
import redis

redis_url = os.getenv('REDIS_URL')

try:
    # Create a Redis client with SSL
    redis_client = redis.StrictRedis.from_url(
        redis_url,
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
