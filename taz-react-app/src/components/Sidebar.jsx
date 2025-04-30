import React from 'react';
import OrderedPostsList from './OrderedPostsList';
import PostsList from './PostsList';
import About from './About';

const Sidebar = () => {
  return (
    <section id="sidebar">
      <OrderedPostsList />
      <PostsList />
      <About />
    </section>
  );
};

export default Sidebar;