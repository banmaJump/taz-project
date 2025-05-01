// pages/SearchResultPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostsList from '../components/PostsList';

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]); // 検索結果を格納するステート
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchQuery = searchParams.get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        if (searchQuery) {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/search?query=${searchQuery}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch search results: ${response.status}`);
          }
          const data = await response.json();
          setSearchResults(data.posts || []); // 検索結果をステートに設定
        } else {
          setSearchResults([]); // クエリがない場合は空の配列を設定
        }
      } catch (err) {
        setError(`Failed to fetch search results: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  if (loading) return <div>検索中...</div>;
  if (error) return <div>エラー: {error}</div>;

  return (
    <div>
      <h2>検索結果</h2>
      <PostsList posts={searchResults} searchQuery={searchQuery} /> {/* posts プロップを渡す */}
    </div>
  );
};

export default SearchResultPage;