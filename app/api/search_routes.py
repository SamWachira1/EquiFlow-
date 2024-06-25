from flask import Blueprint, request, jsonify
from app.models import Security, db
import requests
import os 

search_routes = Blueprint('search', __name__)


ALPHA_VANTAGE_API_KEY = os.getenv('ALPHA_VANTAGE_API_KEY')
FINNHUB_API_KEY = os.getenv('FINNHUB_API_KEY')
STOCKDATAORG_API_KEY = os.getenv('STOCKDATAORG_API_KEY')
FMP_API_KEY = os.getenv('FMP_API_KEY')
TINGO_API_KEY= os.getenv('TINGO_API_KEY')



@search_routes.route('/', methods=['GET'])
def search_security():
    query = request.args.get('query')
    if not query:
        return jsonify({'error': 'No query provided'}), 400

    try:
        results = Security.query.filter(
            (Security.name.ilike(f'{query}%')) | 
            (Security.symbol.ilike(f'{query}%'))
        ).limit(5).all()

        if results:
            suggestions = [{'name': s.name, 'symbol': s.symbol} for s in results]
            return jsonify(suggestions)
        
        # Fallback to Tiingo API if no results found
        tingo_response = requests.get(
            f'https://api.tiingo.com/tiingo/utilities/search?query={query}&limit=5&token={TINGO_API_KEY}'
        )
        api_results = tingo_response.json()

        suggestions = []
        for result in api_results:
            name = result.get('name')
            symbol = result.get('ticker')
            if name and symbol:
                suggestions.append({'name': name, 'symbol': symbol})
                # Add to local database for future searches
                if not Security.query.filter_by(symbol=symbol).first():
                    new_security = Security(name=name, symbol=symbol)
                    db.session.add(new_security)
                    db.session.commit()

        return jsonify(suggestions)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
