import React, { useState, useEffect, useRef } from 'react';
import Intro from '../components/Intro';
import PostsList from '../components/PostsList';
import Pagination from '../components/Pagination';
import { useLocation } from 'react-router-dom';

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const mainRef = useRef(null); // Main コンポーネントの最上位 div への参照
  const location = useLocation(); // 現在のロケーションを取得

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
        setPosts(data.posts);
        const calculatedTotalPages = Math.ceil(data.totalCount / itemsPerPage);
        setTotalPages(calculatedTotalPages);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(`Failed to fetch posts: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, itemsPerPage]);

  // ページ遷移時にスクロールをトップに戻す
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname]); // location.pathname が変わるたびに実行

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="main" ref={mainRef}> {/* ref を設定 */}
      <Intro />
      <PostsList key={currentPage} posts={posts} />
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