import React, { useState, useEffect } from 'react';
import Header from './Header';

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                let url = `${process.env.REACT_APP_API_BASE_URL}/api/posts`;
                if (searchQuery) {
                    const params = new URLSearchParams({ query: searchQuery });
                    url = `${process.env.REACT_APP_API_BASE_URL}/api/search?${params.toString()}`;
                }
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch posts: ${response.status}`);
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setPosts(data);
                } else if (data && Array.isArray(data.posts)) {
                    setPosts(data.posts);
                } else {
                    throw new Error('Invalid API response format');
                }
            } catch (err) {
                setError(`Failed to fetch posts: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [searchQuery]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Header onSearch={handleSearch} />
            <section>
                <ul className="posts">
                    {posts.length === 0 && searchQuery && <li>「{searchQuery}」に一致する検索結果はありません。</li>}
                    {posts.map((post) => {
                        const postImageUrl = `${process.env.PUBLIC_URL}/images/${post.image_url}`;
                        return (
                            <li key={post.id}>
                                <article>
                                    <header>
                                        <h3><a href={`/post/${post.id}`}>{post.title}</a></h3>
                                        <time className="published" dateTime={post.published_at}>
                                            {new Date(post.published_at).toLocaleDateString()}
                                        </time>
                                    </header>
                                    <a href={`/post/${post.id}`} className="image">
                                        <img src={postImageUrl} alt={post.title} />
                                    </a>
                                </article>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </div>
    );
};

export default PostsList;