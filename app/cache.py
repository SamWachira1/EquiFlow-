# app/cache.py
import os
from flask_caching import Cache

cache = Cache(config={'CACHE_TYPE': 'RedisCache', 'CACHE_REDIS_URL': os.getenv('REDIS_URL')})
