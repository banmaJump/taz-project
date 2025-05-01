import React, { useState, useEffect } from 'react';
import Intro from '../components/Intro';
import PostsList from '../components/PostsList';
import Pagination from '../components/Pagination';

const Main = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts?page=${currentPage}&limit=${itemsPerPage}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                console.log('API Response Data:', data);
                setPosts(data.posts);
                console.log('Updated posts state:', posts);
                const calculatedTotalPages = Math.ceil(data.totalCount / itemsPerPage);
                setTotalPages(calculatedTotalPages);
                console.log('Total Pages:', calculatedTotalPages); // ← 追加: totalPages のログ出力
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError(`Failed to fetch posts: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [currentPage, itemsPerPage]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div id="main">
            <Intro />
            <PostsList posts={posts} />
            {console.log('Posts prop passed to PostsList:', posts)}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onNextPage={handleNextPage}
                    onPrevPage={handlePrevPage}
                />
            )}
        </div>
    );
};

export default Main;