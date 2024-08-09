from app.models import db, User, Security, environment, SCHEMA
from sqlalchemy.sql import text
from werkzeug.security import generate_password_hash


# Adds a demo user, you can add other users here if you want
def create_seeder():

    ## SEED USERS
    ## SEED USERS
    user_list = [
        {'username': 'Demo', 'email': 'demo@aa.io', 'password': 'password', 'google_id': None},
        {'username': 'Sam', 'email': '187swachira@gmail.com', 'password': 'password', 'google_id': None},
        # Example of a Google OAuth user
        # {'username': 'GoogleUser', 'email': 'googleuser@example.com', 'password': None, 'google_id': 'google_id_example'}
    ]

    for user_data in user_list:
        hashed_password = generate_password_hash(user_data['password']) if user_data['password'] else None
        user = User(
            username=user_data['username'],
            email=user_data['email'],
            google_id=user_data['google_id'],  # Set google_id if any
            hashed_password=hashed_password
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
        {'name': 'PepsiCo, Inc.', 'symbol': 'PEP'},
        {'name': 'Vanguard Total Stock Market Index Fund', 'symbol': 'VTSAX'},
        {'name': 'Fidelity 500 Index Fund', 'symbol': 'FXAIX'},
        {'name': 'T. Rowe Price Blue Chip Growth Fund', 'symbol': 'TRBCX'},
        {'name': 'American Funds Growth Fund of America', 'symbol': 'AGTHX'},
        {'name': 'PIMCO Total Return Fund', 'symbol': 'PTTRX'},
        {'name': 'Vanguard Total Bond Market Index Fund', 'symbol': 'VBTLX'},
        {'name': 'iShares Core U.S. Aggregate Bond ETF', 'symbol': 'AGG'},
        {'name': 'SPDR S&P 500 ETF Trust', 'symbol': 'SPY'},
        {'name': 'iShares Russell 2000 ETF', 'symbol': 'IWM'},
        {'name': 'Vanguard FTSE Emerging Markets ETF', 'symbol': 'VWO'},
        {'name': 'Vanguard Real Estate ETF', 'symbol': 'VNQ'},
        {'name': 'Morgan Stanley', 'symbol': 'MS'},
        {'name': 'General Motors Company', 'symbol': 'GM'},
        {'name': 'Boeing Company', 'symbol': 'BA'},
        {'name': 'American Express Company', 'symbol': 'AXP'},
        {'name': 'Netflix, Inc.', 'symbol': 'NFLX'},
        {'name': 'PayPal Holdings, Inc.', 'symbol': 'PYPL'},
        {'name': 'Starbucks Corporation', 'symbol': 'SBUX'},
        {'name': 'AbbVie Inc.', 'symbol': 'ABBV'},
        {'name': '3M Company', 'symbol': 'MMM'},
        {'name': 'Wells Fargo & Company', 'symbol': 'WFC'},
        {'name': 'Chevron Corporation', 'symbol': 'CVX'},
        {'name': 'Citigroup Inc.', 'symbol': 'C'},
        {'name': 'Salesforce.com Inc.', 'symbol': 'CRM'},
        {'name': 'Qualcomm Incorporated', 'symbol': 'QCOM'},
        {'name': 'Adobe Inc.', 'symbol': 'ADBE'},
        {'name': 'International Business Machines Corporation', 'symbol': 'IBM'},
        {'name': 'The Charles Schwab Corporation', 'symbol': 'SCHW'},
        {'name': 'The Progressive Corporation', 'symbol': 'PGR'},
        {'name': 'Bristol-Myers Squibb Company', 'symbol': 'BMY'},
        {'name': 'Lockheed Martin Corporation', 'symbol': 'LMT'},
        {'name': 'Caterpillar Inc.', 'symbol': 'CAT'},
        {'name': 'Honeywell International Inc.', 'symbol': 'HON'},
        {'name': 'Texas Instruments Incorporated', 'symbol': 'TXN'},
        {'name': 'Applied Materials, Inc.', 'symbol': 'AMAT'},
        {'name': 'Lam Research Corporation', 'symbol': 'LRCX'},
        {'name': 'Micron Technology, Inc.', 'symbol': 'MU'},
        {'name': 'Broadcom Inc.', 'symbol': 'AVGO'},
        {'name': 'Marvell Technology, Inc.', 'symbol': 'MRVL'},
        {'name': 'Analog Devices, Inc.', 'symbol': 'ADI'},
        {'name': 'Xilinx, Inc.', 'symbol': 'XLNX'},
        {'name': 'KLA Corporation', 'symbol': 'KLAC'},
        {'name': 'NXP Semiconductors N.V.', 'symbol': 'NXPI'},
        {'name': 'ON Semiconductor Corporation', 'symbol': 'ON'},
        {'name': 'Advanced Micro Devices, Inc.', 'symbol': 'AMD'},
        {'name': 'Skyworks Solutions, Inc.', 'symbol': 'SWKS'},
        {'name': 'Teradyne, Inc.', 'symbol': 'TER'},
        {'name': 'ASML Holding N.V.', 'symbol': 'ASML'},
        {'name': 'Medtronic plc', 'symbol': 'MDT'},
        {'name': 'Amgen Inc.', 'symbol': 'AMGN'},
        {'name': 'Gilead Sciences, Inc.', 'symbol': 'GILD'},
        {'name': 'Eli Lilly and Company', 'symbol': 'LLY'},
        {'name': 'Abbott Laboratories', 'symbol': 'ABT'},
        {'name': 'Regeneron Pharmaceuticals, Inc.', 'symbol': 'REGN'},
        {'name': 'Biogen Inc.', 'symbol': 'BIIB'},
        {'name': 'Vertex Pharmaceuticals Incorporated', 'symbol': 'VRTX'},
        {'name': 'Moderna, Inc.', 'symbol': 'MRNA'},
        {'name': 'Illumina, Inc.', 'symbol': 'ILMN'},
        {'name': 'Thermo Fisher Scientific Inc.', 'symbol': 'TMO'}
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
