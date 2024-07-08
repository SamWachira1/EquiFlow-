from flask import Blueprint, request, jsonify
from app.models import Security, db
from flask_login import login_required, current_user

import requests
import os 

search_routes = Blueprint('search_routes', __name__)

EODHD_API_KEY=os.getenv('EODHD_API_KEY')

@search_routes.route('/<symbol>', methods=['GET'])
@login_required
def search_security(symbol):
    if not symbol:
        return jsonify({'error': 'No query provided'}), 400

    try:
        # Query local database first
        results = Security.query.filter(
            (Security.name.ilike(f'{symbol}%')) | 
            (Security.symbol.ilike(f'{symbol}%'))
        ).limit(5).all()

        suggestions = [{'name': s.name, 'symbol': s.symbol} for s in results]

        if suggestions:
            return jsonify(suggestions)

        # Fallback to EODHD search API if no results found locally
        url = f'https://eodhd.com/api/search/{symbol}?api_token={EODHD_API_KEY}&fmt=json'
        response = requests.get(url)
        response.raise_for_status()
        api_response = response.json()

        for result in api_response:
            name = result.get('Name')
            symbol = result.get('Code')
            if name and symbol:
                suggestions.append({'name': name, 'symbol': symbol})

        return jsonify(suggestions)
    except requests.exceptions.RequestException as req_err:
        return jsonify({'error': str(req_err)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@search_routes.route('/select/<symbol>', methods=['GET'])
@login_required
def select_security(symbol):
    if not symbol:
        return jsonify({'error': 'No symbol provided'}), 400

    try:
        # Check if the security exists in the local database
        security = Security.query.filter_by(symbol=symbol).first()

        if security:
            return jsonify({'id': security.id, 'name': security.name, 'symbol': security.symbol})

        # Fallback to EODHD search API if no results found locally
        url = f'https://eodhd.com/api/search/{symbol}?api_token={EODHD_API_KEY}&fmt=json'
        response = requests.get(url)
        response.raise_for_status()
        api_response = response.json()

        if api_response:
            result = api_response[0]
            name = result.get('Name')
            symbol = result.get('Code')
            if name and symbol:
                new_security = Security(name=name, symbol=symbol)
                db.session.add(new_security)
                db.session.commit()
                return jsonify({'id': new_security.id, 'name': new_security.name, 'symbol': new_security.symbol})
        
        return jsonify({'error': 'Security not found'}), 404
    except requests.exceptions.RequestException as req_err:
        return jsonify({'error': str(req_err)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
