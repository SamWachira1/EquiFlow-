from flask import Blueprint, jsonify
from datetime import datetime, timedelta
import requests
import os

EODHD_API_KEY = os.getenv('EODHD_API_KEY')

securities_routes = Blueprint('securities', __name__)

def fetch_yahoo_style_data(symbol, from_date, to_date, period='d'):
    try:
        a = from_date.month - 1
        b = from_date.day
        c = from_date.year
        d = to_date.month - 1
        e = to_date.day
        f = to_date.year

        url = f'https://eodhd.com/api/table.csv?s={symbol}&a={a:02d}&b={b:02d}&c={c}&d={d:02d}&e={e:02d}&f={f}&g={period}&api_token={EODHD_API_KEY}&fmt=json'
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500


def fetch_fundamental_data(symbol):
    try:
        url = f'https://eodhd.com/api/fundamentals/{symbol}?api_token={EODHD_API_KEY}&fmt=json'

        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@securities_routes.route('/historical/1d/<symbol>', methods=['GET'])
def get_1d_data(symbol):
    today = datetime.now()
    yesterday = today - timedelta(days=1)
    return fetch_yahoo_style_data(symbol, yesterday, today)

@securities_routes.route('/historical/1w/<symbol>', methods=['GET'])
def get_1w_data(symbol):
    today = datetime.now()
    one_week_ago = today - timedelta(days=7)
    return fetch_yahoo_style_data(symbol, one_week_ago, today)

@securities_routes.route('/historical/1m/<symbol>', methods=['GET'])
def get_1m_data(symbol):
    today = datetime.now()
    one_month_ago = today - timedelta(days=30)
    return fetch_yahoo_style_data(symbol, one_month_ago, today)

@securities_routes.route('/historical/3m/<symbol>', methods=['GET'])
def get_3m_data(symbol):
    today = datetime.now()
    three_months_ago = today - timedelta(days=90)
    return fetch_yahoo_style_data(symbol, three_months_ago, today)

@securities_routes.route('/historical/ytd/<symbol>', methods=['GET'])
def get_ytd_data(symbol):
    today = datetime.now()
    start_of_year = datetime(today.year, 1, 1)
    return fetch_yahoo_style_data(symbol, start_of_year, today)

@securities_routes.route('/historical/1y/<symbol>', methods=['GET'])
def get_1y_data(symbol):
    today = datetime.now()
    one_year_ago = today - timedelta(days=365)
    return fetch_yahoo_style_data(symbol, one_year_ago, today)

@securities_routes.route('/historical/5y/<symbol>', methods=['GET'])
def get_5y_data(symbol):
    today = datetime.now()
    five_years_ago = today - timedelta(days=5*365)
    return fetch_yahoo_style_data(symbol, five_years_ago, today)


@securities_routes.route('/fundamentals/<symbol>', methods=['GET'])
def get_fundamentals(symbol):
    return fetch_fundamental_data(symbol)
