from app.models import db, User, Security, environment, SCHEMA
from sqlalchemy.sql import text
from werkzeug.security import generate_password_hash


# Adds a demo user, you can add other users here if you want
def create_seeder():

    ## SEED USERS
    user_list = [
        {'username':'Demo', 'email':'demo@aa.io', 'buying_power': 10000, 'password':generate_password_hash("password")}
    ]

    for user_data in user_list:
        user = User(
            username=user_data['username'],
            email=user_data['email'],
            buying_power=user_data['buying_power'],
            hashed_password=user_data['password'],
        )
        db.session.add(user)
    db.session.commit()


    security_list = [
        {'name': 'Apple Inc.', 'symbol': 'AAPL'},
        {'name': 'Microsoft Corporation', 'symbol': 'MSFT'},
        {'name': 'Amazon.com Inc.', 'symbol': 'AMZN'},
        {'name': 'Alphabet Inc. (Class A)', 'symbol': 'GOOGL'},
        {'name': 'Alphabet Inc. (Class C)', 'symbol': 'GOOG'},
        {'name': 'Facebook Inc.', 'symbol': 'FB'},
        {'name': 'Tesla Inc.', 'symbol': 'TSLA'},
        {'name': 'Berkshire Hathaway Inc. (Class A)', 'symbol': 'BRK.A'},
        {'name': 'Berkshire Hathaway Inc. (Class B)', 'symbol': 'BRK.B'},
        {'name': 'Johnson & Johnson', 'symbol': 'JNJ'},
        {'name': 'JPMorgan Chase & Co.', 'symbol': 'JPM'},
        {'name': 'Visa Inc.', 'symbol': 'V'},
        {'name': 'Walmart Inc.', 'symbol': 'WMT'},
        {'name': 'Procter & Gamble Co.', 'symbol': 'PG'},
        {'name': 'UnitedHealth Group Incorporated', 'symbol': 'UNH'},
        {'name': 'Mastercard Incorporated', 'symbol': 'MA'},
        {'name': 'NVIDIA Corporation', 'symbol': 'NVDA'},
        {'name': 'Home Depot, Inc.', 'symbol': 'HD'},
        {'name': 'Pfizer Inc.', 'symbol': 'PFE'},
        {'name': 'Bank of America Corporation', 'symbol': 'BAC'},
        {'name': 'Exxon Mobil Corporation', 'symbol': 'XOM'},
        {'name': 'AT&T Inc.', 'symbol': 'T'},
        {'name': 'Walt Disney Company', 'symbol': 'DIS'},
        {'name': 'Intel Corporation', 'symbol': 'INTC'},
        {'name': 'Coca-Cola Company', 'symbol': 'KO'},
        {'name': 'McDonald\'s Corporation', 'symbol': 'MCD'},
        {'name': 'Nike, Inc.', 'symbol': 'NKE'},
        {'name': 'Verizon Communications Inc.', 'symbol': 'VZ'},
        {'name': 'Cisco Systems, Inc.', 'symbol': 'CSCO'},
        {'name': 'PepsiCo, Inc.', 'symbol': 'PEP'}
]

    for security_data in security_list:
        security = Security(
            name=security_data['name'],
            symbol=security_data['symbol']
        )
        db.session.add(security)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_seeder():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.securities RESTART IDENTITY CASCADE;")

    else:
        db.session.execute(text("DELETE FROM users"))
        db.session.execute(text("DELETE FROM securities"))

        
    db.session.commit()
