import os
from flask_caching import Cache

# Construct the Redis URL
redis_scheme = 'rediss' if os.getenv('REDIS_USE_TLS', 'False') == 'True' else 'redis'
redis_user = os.getenv('REDIS_USER')
redis_password = os.getenv('REDIS_PASSWORD')
redis_host = os.getenv('REDIS_HOST')
redis_port = os.getenv('REDIS_PORT', 6379)

# Construct the Redis URL
redis_url = f"{redis_scheme}://{redis_user}:{redis_password}@{redis_host}:{redis_port}"

# Initialize the cache
cache = Cache(config={
    'CACHE_TYPE': 'RedisCache',
    'CACHE_REDIS_URL': redis_url,
    'CACHE_REDIS_PASSWORD': os.getenv('REDIS_PASSWORD'),
    'CACHE_REDIS_DB': 0,
    'CACHE_REDIS_HOST': os.getenv('REDIS_HOST'),
    'CACHE_REDIS_PORT': int(os.getenv('REDIS_PORT', 6379)),
    'CACHE_REDIS_TLS': os.getenv('REDIS_USE_TLS', 'False') == 'True'
})

# Print the cache configuration for debugging
# print(f"CACHE_TYPE: {cache.config.get('CACHE_TYPE')}")
# print(f"CACHE_REDIS_URL: {cache.config.get('CACHE_REDIS_URL')}")
# print(f"CACHE_REDIS_PASSWORD: {cache.config.get('CACHE_REDIS_PASSWORD')}")
# print(f"CACHE_REDIS_DB: {cache.config.get('CACHE_REDIS_DB')}")
# print(f"CACHE_REDIS_HOST: {cache.config.get('CACHE_REDIS_HOST')}")
# print(f"CACHE_REDIS_PORT: {cache.config.get('CACHE_REDIS_PORT')}")
# print(f"CACHE_REDIS_TLS: {cache.config.get('CACHE_REDIS_TLS')}")
