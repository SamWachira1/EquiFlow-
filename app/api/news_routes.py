# app/api/news_routes.py
from flask import Blueprint, jsonify
import requests
import os
from flask_login import login_required
from datetime import datetime, timedelta

news_routes = Blueprint('news', __name__)

MEDIASTACK_API_KEY = os.getenv('MEDIASTACK_API_KEY')  # Use the environment variable for the API key
KEYWORDS = ['buisness', 'economy']  # List of keywords to search for

@news_routes.route('/', methods=['GET'])
@login_required  # Require login to access this route
def get_news():
    base_url = 'http://api.mediastack.com/v1/news'
    
    # Calculate the date range for the last week
    to_date = datetime.now().strftime('%Y-%m-%d')
    from_date = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')
    
    all_news = []
    for keyword in KEYWORDS:
        params = {
            'access_key': MEDIASTACK_API_KEY,
            'countries': 'us',
            'languages': 'en',
            'sort': 'published_desc',
            'limit': 10,
            'date': f'{from_date},{to_date}',
            'keywords': keyword
        }

        # Make the API request
        try:
            response = requests.get(base_url, params=params)
            response.raise_for_status()

            if 'text/html' in response.headers.get('Content-Type', ''):
                return jsonify({'error': 'Unexpected HTML response received'}), 500

            if not response.text:
                return jsonify({'error': 'Empty response from the API'}), 204
            
            news_data = response.json().get('data', [])
            
            # Extracting required fields
            formatted_news = [
                {
                    'date': article.get('published_at'),
                    'title': article.get('title'),
                    'content': article.get('description'),
                    'link': article.get('url'),
                    'source': article.get('source')
                }
                for article in news_data
            ]

            all_news.extend(formatted_news)
        except requests.RequestException as e:
            return jsonify({'error': str(e)}), 500
        except ValueError as ve:
            return jsonify({'error': 'Failed to parse JSON response'}), 500

    # Remove duplicates
    unique_news = {news['title']: news for news in all_news}.values()

    return jsonify(list(unique_news))
