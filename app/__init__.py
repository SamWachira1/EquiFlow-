import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_caching import Cache
from .models import db, User
from .seeds import seed_commands
from .config import Config

# Initialize cache object without binding it to an app
cache = Cache()

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
    db.init_app(app)
    Migrate(app, db)

    redis_url = os.getenv('CACHE_REDIS_URL')
    if not redis_url.startswith(('redis://', 'rediss://', 'unix://')):
        redis_url = 'redis://' + redis_url

    if not redis_url.startswith(('redis://', 'rediss://', 'unix://')):
        raise ValueError("Invalid Redis URL. Must specify one of the following schemes (redis://, rediss://, unix://)")

    cache.init_app(app, config={'CACHE_TYPE': 'redis', 'CACHE_REDIS_URL': redis_url})


    
    # Register blueprints
    from .api.user_routes import user_routes
    from .api.auth_routes import auth_routes
    from .api.search_routes import search_routes
    from .api.securities_routes import securities_routes
    from .api.watchlist_routes import watchlist_routes
    from .api.holdings_routes import holding_routes
    from .api.transactions_routes import transaction_routes

    app.register_blueprint(user_routes, url_prefix='/api/users')
    app.register_blueprint(auth_routes, url_prefix='/api/auth')
    app.register_blueprint(search_routes, url_prefix='/api/search')
    app.register_blueprint(securities_routes, url_prefix='/api/securities')
    app.register_blueprint(watchlist_routes, url_prefix='/api/watchlists')
    app.register_blueprint(holding_routes, url_prefix='/api/holdings')
    app.register_blueprint(transaction_routes, url_prefix='/api/transactions')

    # Application Security
    CORS(app)

    @app.before_request
    def https_redirect():
        if os.environ.get('FLASK_ENV') == 'production':
            if request.headers.get('X-Forwarded-Proto') == 'http':
                url = request.url.replace('http://', 'https://', 1)
                code = 301
                return redirect(url, code=code)

    @app.after_request
    def inject_csrf_token(response):
        response.set_cookie(
            'csrf_token',
            generate_csrf(),
            secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
            samesite='Strict' if os.environ.get(
                'FLASK_ENV') == 'production' else None,
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

    return app
