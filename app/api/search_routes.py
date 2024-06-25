from flask import Blueprint, request, jsonify
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
        # # ! Rate limit 20/day 
        # alpha_response_ticker = requests.get(
        #     f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={query}&apikey={ALPHA_VANTAGE_API_KEY}'
        # )
        #   # ! Rate limit 20/day 
        # alpha_response_description = requests.get(
        #     f'https://www.alphavantage.co/query?function=OVERVIEW&symbol={query}&apikey={ALPHA_VANTAGE_API_KEY}'
        # )
        # alpha_utulity_search = requests.get(
        #     f'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={query}&apikey={ALPHA_VANTAGE_API_KEY}'
        # )

        # finnHub_response_ticker = requests.get(
        #     f'https://finnhub.io/api/v1/quote?symbol={query}&token={FINNHUB_API_KEY}'
        # )

        # stock_data_org = requests.get(
        #     f'https://api.stockdata.org/v1/data/quote?symbols={query}&api_token={STOCKDATAORG_API_KEY}'
        # )

        # fmp = requests.get(
        #     f'https://financialmodelingprep.com/api/v3/quote/{query}?apikey={FMP_API_KEY}'
        # )
        
        tingo = requests.get(
            f'https://api.tiingo.com/tiingo/utilities/search?query={query}&limit=5&token={TINGO_API_KEY}'
        )

        # utility_search_alpha = alpha_utulity_search.json()
        # ticker = alpha_response_ticker.json()
        # ticker_finnHub = finnHub_response_ticker.json()
        # description = alpha_response_description.json()
        # sdo = stock_data_org.json()
        # financialmodelingprep = fmp.json()
        suggestions = tingo.json()

        return {
        
            query: suggestions

        }
    except Exception as e:
        return {'error': str(e)}, 500


     # 'alpha_ticker': ticker,
                # 'finnhub': ticker_finnHub,
                # 'alpha_description': description,
                # 'stock_data_org': sdo,
                # 'fmp': financialmodelingprep,
                # 'search': utility_search_alpha,
