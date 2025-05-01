// pages/SearchResultPage.jsx (新規作成)
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PostsList from '../components/PostsList';

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const navigate = useNavigate();

  return (
    <div>
      <h2>検索結果</h2>
      <PostsList searchQuery={searchQuery} /> 
    </div>
  );
};

export default SearchResultPage;