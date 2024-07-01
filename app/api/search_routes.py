from flask import Blueprint, request, jsonify
from app.models import Security, db
from flask_login import login_required

import requests
import os 

search_routes = Blueprint('search', __name__)

EODHD_API_KEY=os.getenv('EODHD_API_KEY')

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

        # Fallback to EODHD search API if no results found locally
        url = f'https://eodhd.com/api/search/{query}?api_token={EODHD_API_KEY}&fmt=json'
        response = requests.get(url)
        response.raise_for_status()
        api_response = response.json()
        
        # Extract relevant data from the API response
        for result in api_response:
            name = result.get('Name')
            symbol = result.get('Code')
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
    except requests.exceptions.RequestException as req_err:
        print(f"Request Error: {req_err}")
        return jsonify({'error': str(req_err)}), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500
