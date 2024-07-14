# app/__init__.py
import os
from flask import Flask, render_template, request, session, redirect, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User
from .seeds import seed_commands
from .config import Config
from .cache import cache  # Import the cache object

# Register blueprints
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.search_routes import search_routes
from .api.securities_routes import securities_routes
from .api.watchlist_routes import watchlist_routes
from .api.holdings_routes import holding_routes
from .api.transactions_routes import transaction_routes

def create_app():
    app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')

    # Setup login manager
    login = LoginManager(app)
    login.login_view = 'auth.unauthorized'

    @login.user_loader
    def load_user(id):
        return User.query.get(int(id))

    # Tell flask about our seed commands
    app.cli.add_command(seed_commands)

    app.config.from_object(Config)

    # Initialize Flask-Caching
    cache.init_app(app)  # Initialize cache with the app

    # Register blueprints
    app.register_blueprint(user_routes, url_prefix='/api/users')
    app.register_blueprint(auth_routes, url_prefix='/api/auth')
    app.register_blueprint(search_routes, url_prefix='/api/search')
    app.register_blueprint(securities_routes, url_prefix='/api/securities')
    app.register_blueprint(watchlist_routes, url_prefix='/api/watchlists')
    app.register_blueprint(holding_routes, url_prefix='/api/holdings')
    app.register_blueprint(transaction_routes, url_prefix='/api/transactions')

    db.init_app(app)
    Migrate(app, db)

    # Application Security
    CORS(app)

    # Redirect HTTP to HTTPS in production
    @app.before_request
    def https_redirect():
        if os.environ.get('FLASK_ENV') == 'production':
            if request.headers.get('X-Forwarded-Proto') == 'http':
                url = request.url.replace('http://', 'https://', 1)
                code = 301
                return redirect(url, code=code)

    # Inject CSRF token into cookies
    @app.after_request
    def inject_csrf_token(response):
        response.set_cookie(
            'csrf_token',
            generate_csrf(),
            secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
            samesite='Strict' if os.environ.get('FLASK_ENV') == 'production' else None,
            httponly=True)
        return response

    @app.route("/api/docs")
    def api_help():
        """
        Returns all API routes and their doc strings
        """
        acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
        route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                        app.view_functions[rule.endpoint].__doc__ ]
                        for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
        return route_list

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def react_root(path):
        """
        This route will direct to the public directory in our
        react builds in the production environment for favicon
        or index.html requests
        """
        if path == 'favicon.ico':
            return app.send_from_directory('public', 'favicon.ico')
        return app.send_static_file('index.html')

    @app.errorhandler(404)
    def not_found(e):
        return app.send_static_file('index.html')

    @app.route('/test_redis')
    def test_redis():
        try:
            cache.cache._client.ping()
            return jsonify({'status': 'connected'})
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})

    return app

app = create_app()
