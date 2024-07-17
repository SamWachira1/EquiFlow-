from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Regexp
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[
            DataRequired(),
            Length(min=3, max=20, message="Username must be between 3 and 20 characters."),
            Regexp('^[A-Za-z][A-Za-z0-9_.]*$', 0, 'Usernames must have only letters, numbers, dots or underscores'),
            username_exists
        ])
    email = StringField('email', validators=[
        DataRequired(),
        Email(message="Invalid email address."),
        user_exists
    ])
    password = PasswordField('password', validators=[
        DataRequired(),
        Length(min=8, message="Password must be at least 8 characters long."),
        Regexp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).+$', 0,
               'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.')
    ])
