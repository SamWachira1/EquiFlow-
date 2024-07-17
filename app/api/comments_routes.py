# routes/comments_routes.py
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Comment, Security
from app.forms import CommentForm, UpdateCommentForm

comments_routes = Blueprint('comments', __name__)

@comments_routes.route('/', methods=['POST'])
@login_required
def create_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            security = Security.query.filter_by(symbol=form.security_symbol.data).first()
            if not security:
                return jsonify({'error': 'Security not found'}), 404

            new_comment = Comment(
                user_id=current_user.id,
                security_id=security.id,
                content=form.content.data
            )
            db.session.add(new_comment)
            db.session.commit()
            return jsonify(new_comment.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
    return jsonify({'errors': form.errors}), 400

@comments_routes.route('/<string:symbol>', methods=['GET'])
@login_required
def get_comments(symbol):
    try:
        security = Security.query.filter_by(symbol=symbol).first()
        if not security:
            return jsonify({'error': 'Security not found'}), 404

        comments = Comment.query.filter_by(security_id=security.id).all()
        return jsonify([comment.to_dict() for comment in comments]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@comments_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment(id):
    form = UpdateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            comment = Comment.query.filter_by(id=id, user_id=current_user.id).first()
            if not comment:
                return jsonify({'error': 'Comment not found'}), 404

            comment.content = form.content.data
            db.session.commit()
            return jsonify(comment.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
    return jsonify({'errors': form.errors}), 400

@comments_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    try:
        comment = Comment.query.filter_by(id=id, user_id=current_user.id).first()
        if not comment:
            return jsonify({'error': 'Comment not found'}), 404

        db.session.delete(comment)
        db.session.commit()
        return jsonify({'message': 'Comment deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
