// OrderedPostsList.jsx
import React, { useState, useEffect } from 'react';
import MiniPost from './MiniPost';

const OrderedPostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderedPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts/ordered`);
        if (!response.ok) {
          throw new Error('Failed to fetch ordered posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderedPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>No posts found.</div>;
  }

  return (
    <div className='mini-posts'>
      {posts.map((post) => {
        return post && <MiniPost key={post.id} post={post} />;
      })}
    </div>
  );
};

export default OrderedPostsList;