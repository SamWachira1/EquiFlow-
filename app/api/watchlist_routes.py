from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Watchlist, WatchlistSecurity, Security
from app.forms import WatchlistForm


watchlist_routes = Blueprint('watchlists', __name__)


@watchlist_routes.route('/', methods=['POST'])
@login_required
def create_watchlist():
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    
    if form.validate_on_submit():
        name = form.data['name']
        new_watchlist = Watchlist(name=name, user_id=current_user.id)

        
        try:
            db.session.add(new_watchlist)
            db.session.commit()
            return jsonify(new_watchlist.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    return jsonify(form.errors), 400


@watchlist_routes.route('/', methods=['GET'])
@login_required
def get_watchlists():
    watchlists = Watchlist.query.filter_by(user_id=current_user.id).all()
    return jsonify([watchlist.to_dict() for watchlist in watchlists]), 200

@watchlist_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_watchlist(id):
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        name = form.data['name']
        watchlist = Watchlist.query.get_or_404(id)
        
        if watchlist.user_id != current_user.id:
            return jsonify({'error': 'Unauthorized'}), 403
        
        try:
            watchlist.name = name
            db.session.commit()
            return jsonify(watchlist.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    return jsonify(form.errors), 400



@watchlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_watchlist(id):
    watchlist = Watchlist.query.get_or_404(id)
    
    if watchlist.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

    try:
        db.session.delete(watchlist)
        db.session.commit()
        return jsonify({'message': 'Watchlist deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@watchlist_routes.route('/addStock', methods=['POST'])
@login_required
def add_stock_to_watchlists():
    data = request.get_json()
    stock_symbol = data.get('stockSymbol')
    stock_name = data.get('stockName')
    watchlist_ids = data.get('watchlistIds')

    try:
        # Check if the stock already exists in the securities table
        stock = Security.query.filter_by(symbol=stock_symbol).first()
        if not stock:
            # Add the stock to the securities table
            stock = Security(symbol=stock_symbol, name=stock_name)
            db.session.add(stock)
            db.session.commit()
        
        # Get the stock ID after committing the new stock
        stock_id = stock.id

        for watchlist_id in watchlist_ids:
            watchlist = Watchlist.query.get(watchlist_id)
            if watchlist and watchlist.user_id == current_user.id:
                # Check if the stock is already in the watchlist
                existing_entry = WatchlistSecurity.query.filter_by(security_id=stock_id, watchlist_id=watchlist_id).first()
                if not existing_entry:
                    new_entry = WatchlistSecurity(security_id=stock_id, watchlist_id=watchlist_id)
                    db.session.add(new_entry)
        db.session.commit()
        return jsonify({'message': 'Stock added to watchlists successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
