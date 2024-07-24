# app/socket.py
import os
import json
from flask_socketio import SocketIO, emit
from websocket import WebSocketApp
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

EODHD_API_KEY = os.getenv('EODHD_API_KEY')

# Determine origins based on environment
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://equiflow.onrender.com",
        "https://equiflow.onrender.com",
        "wss://equiflow.onrender.com",
        "ws://equiflow.onrender.com",
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('subscribe_forex')
def handle_subscribe_forex(data):
    symbols = data['symbols']
    print(f"Subscribed to FOREX symbols: {symbols}")

    ws_url = f'wss://ws.eodhistoricaldata.com/ws/forex?api_token={EODHD_API_KEY}'

    def on_message(ws, message):
        print(f"Received message: {message}")
        socketio.emit('forex_data', message)

    def on_error(ws, error):
        print(f"Error: {error}")

    def on_close(ws, close_status_code, close_msg):
        print("### closed ###")

    def on_open(ws):
        subscribe_message = json.dumps({
            "action": "subscribe",
            "symbols": symbols
        })
        ws.send(subscribe_message)

    ws = WebSocketApp(ws_url,
                      on_open=on_open,
                      on_message=on_message,
                      on_error=on_error,
                      on_close=on_close)
    ws.run_forever()
