import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { createCommentThunk, getCommentsThunk, updateCommentThunk, deleteCommentThunk, getMemoizedComments } from '../../redux/comments';
import styles from './Comments.module.css';

const Comments = ({ securitySymbol }) => {
    const dispatch = useDispatch();
    const comments = useSelector(getMemoizedComments);
    const [content, setContent] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editId, setEditId] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown
    const [error, setError] = useState(''); // State for error message

    useEffect(() => {
        dispatch(getCommentsThunk(securitySymbol));
    }, [dispatch, securitySymbol]);

    const handleCreate = () => {
        if (content.trim() === '') {
            setError('Comment cannot be empty');
            return;
        }
        dispatch(createCommentThunk(securitySymbol, content));
        setContent('');
        setError('');
    };

    const handleUpdate = () => {
        if (editContent.trim() === '') {
            setError('Comment cannot be empty');
            return;
        }
        dispatch(updateCommentThunk(editId, editContent));
        setEditId(null);
        setEditContent('');
        setError('');
    };

    const handleDelete = (id) => {
        dispatch(deleteCommentThunk(id));
    };

    return (
        <div className={styles.commentsSection}>
            <h3 onClick={() => setIsOpen(!isOpen)} className={styles.commentsHeader}>
                Comments {isOpen ? <FaAngleUp /> : <FaAngleDown />}
            </h3>
            {isOpen && (
                <div className={styles.commentsDropdown}>
                    <div className={styles.commentForm}>
                        <input
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Add a comment"
                        />
                        <button onClick={handleCreate}>Add Comment</button>
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <ul className={styles.commentsList}>
                        {comments.map(comment => (
                            <li key={comment.id} className={styles.commentItem}>
                                {editId === comment.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            placeholder="Edit comment"
                                        />
                                        <button onClick={handleUpdate}>Update</button>
                                        <button onClick={() => {
                                            setEditId(null);
                                            setEditContent('');
                                            setError('');
                                        }}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <span>{comment.content}</span>
                                        <button onClick={() => {
                                            setEditId(comment.id);
                                            setEditContent(comment.content);
                                            setError('');
                                        }}>
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(comment.id)}>
                                            <FaTrash />
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Comments;
