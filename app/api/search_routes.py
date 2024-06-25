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
        # Query local database first
        results = Security.query.filter(
            (Security.name.ilike(f'{query}%')) | 
            (Security.symbol.ilike(f'{query}%'))
        ).limit(5).all()

        suggestions = [{'name': s.name, 'symbol': s.symbol} for s in results]

        # If local results are found, return them
        if suggestions:
            return jsonify(suggestions)

        # Fallback to StockData API if no results found locally
        stock_data_org = requests.get(
            f'https://api.stockdata.org/v1/entity/search?search={query}&api_token={STOCKDATAORG_API_KEY}'
        )
        api_response = stock_data_org.json()
        api_results = api_response.get('data', [])

        for result in api_results:
            name = result.get('name')
            symbol = result.get('symbol')
            if name and symbol:
                suggestions.append({'name': name, 'symbol': symbol})
                # Add to local database for future searches
                if not Security.query.filter_by(symbol=symbol).first():
                    try:
                        new_security = Security(name=name, symbol=symbol)
                        db.session.add(new_security)
                        db.session.commit()
                        print(f"Added {name} ({symbol}) to the database.")
                    except Exception as db_error:
                        db.session.rollback()
                        print(f"Failed to add {name} ({symbol}) to the database. Error: {db_error}")

        return jsonify(suggestions)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500
