import React, { useState, useEffect } from 'react';
import Intro from './Intro';
import Post from './Post';

const Main = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts?page=${currentPage}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data.posts);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div id="main">
            <Intro />
            <Post posts={posts} />
            <ul className="actions pagination">
                <li><a onClick={handlePreviousPage} className={`button large previous ${currentPage === 1 ? 'disabled' : ''}`}>前のページへ</a></li>
                <li><span>{currentPage} / {totalPages}</span></li>
                <li><a onClick={handleNextPage} className={`button large next ${currentPage === totalPages ? 'disabled' : ''}`}>次のページへ</a></li>
            </ul>
        </div>
    );
};

export default Main;