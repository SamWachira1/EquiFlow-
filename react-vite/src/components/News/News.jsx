// src/components/News.js
import {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewsThunk, getMemoizedNews } from '../../redux/news';
import styles from './News.module.css';

const News = () => {
    const dispatch = useDispatch();
    const news = useSelector(getMemoizedNews);

    useEffect(() => {
        dispatch(getNewsThunk());
    }, [dispatch]);

    return (
        <div className={styles.news}>
            <h2>News</h2>
            <div className={styles.newsList}>
                {news.map((article) => (
                    <div key={article.date} className={styles.newsItem}>
                        <a href={article.link} target="_blank" rel="noopener noreferrer" className={styles.newsTitle}>
                            {article.title}
                        </a>
                        <span className={styles.newsDate}>{new Date(article.date).toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
