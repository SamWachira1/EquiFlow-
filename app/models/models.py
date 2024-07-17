from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, backref


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    buying_power = db.Column(db.Float, nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    holdings = relationship('Holding', backref='user', cascade='all, delete-orphan')
    transactions = relationship('Transaction', backref='user', cascade='all, delete-orphan')
    watchlists = relationship('Watchlist', backref='user', cascade='all, delete-orphan')



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'buying_power': self.buying_power
        }

class Security(db.Model):
    __tablename__ = 'securities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    symbol = db.Column(db.String(10), nullable=False, unique=True)

    holdings = relationship('Holding', backref='security', cascade='all, delete-orphan')
    transactions = relationship('Transaction', backref='security', cascade='all, delete-orphan')
    watchlist_securities = relationship('WatchlistSecurity', backref='security', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'symbol': self.symbol,
        }

class Holding(db.Model):
    __tablename__ = 'holdings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    security_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('securities.id')), nullable=False)
    shares = db.Column(db.Float, nullable=False)
    purchase_price = db.Column(db.Float)
    purchase_date = db.Column(db.DateTime(timezone=True))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'security_id': self.security_id,
            'shares': self.shares,
            'purchase_price': self.purchase_price,
            'purchase_date': self.purchase_date,
        }

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    security_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('securities.id')), nullable=False)
    shares = db.Column(db.Float, nullable=False)
    transaction_type = db.Column(db.String(10), nullable=False)
    transaction_price = db.Column(db.Float, nullable=False)
    transaction_date = db.Column(db.DateTime(timezone=True), server_default=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'security_id': self.security_id,
            'shares': self.shares,
            'transaction_type': self.transaction_type,
            'transaction_price': self.transaction_price,
            'transaction_date': self.transaction_date,
        }

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    watchlist_securities = relationship('WatchlistSecurity', backref='watchlist', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'created_at': self.created_at,
        }

class WatchlistSecurity(db.Model):
    __tablename__ = 'watchlist_securities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    security_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('securities.id')), primary_key=True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('watchlists.id')), primary_key=True)

    def to_dict(self):
        return {
            'security_id': self.security_id,
            'watchlist_id': self.watchlist_id,
        }

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    security_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('securities.id')), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    user = db.relationship('User', backref='comments')
    security = db.relationship('Security', backref='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'security_id': self.security_id,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'username': self.user.username  
        }
