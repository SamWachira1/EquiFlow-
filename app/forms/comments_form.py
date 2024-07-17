from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    security_symbol = StringField('security_symbol', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])

class UpdateCommentForm(FlaskForm):
    content = TextAreaField('content', validators=[DataRequired()])
