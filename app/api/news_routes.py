# app/api/news_routes.py
from flask import Blueprint, jsonify
import requests
import os
from flask_login import login_required
from datetime import datetime, timedelta

news_routes = Blueprint('news', __name__)

EODHD_API_KEY = os.getenv('EODHD_API_KEY')  # Use the environment variable for the API key

# Selected tags
TAGS = [
   "AI"
]

@news_routes.route('/', methods=['GET'])
@login_required  # Require login to access this route
def get_news():
    base_url = 'https://eodhd.com/api/news'
    
    # Select a tag (cycle through the tags to get diverse news)
    tag = TAGS[0]  # Example: You could rotate this based on your needs
    offset = 0
    limit = 10
    
   # Calculate the date range for the last month
    to_date = datetime.now().strftime('%Y-%m-%d')
    from_date = datetime(datetime.now().year, 1, 1).strftime('%Y-%m-%d')
    
    params = {
        'api_token': EODHD_API_KEY,
        't': tag,
        'offset': offset,
        'limit': limit,
        'fmt': 'json'
    }

    # Make the API request
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()

        if 'text/html' in response.headers.get('Content-Type', ''):
            return jsonify({'error': 'Unexpected HTML response received'}), 500

        if not response.text:
            return jsonify({'error': 'Empty response from the API'}), 204
        
        news_data = response.json()
        
        # Extracting required fields
        formatted_news = [
            {
                'date': article.get('date'),
                'title': article.get('title'),
                'content': article.get('content'),
                'link': article.get('link'),
                'symbols': article.get('symbols', [])
            }
            for article in news_data
        ]

        return jsonify(formatted_news)
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500
    except ValueError as ve:
        return jsonify({'error': 'Failed to parse JSON response'}), 500
