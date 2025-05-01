import React from 'react';
import OrderedPostsList from './OrderedPostsList';
import About from './About';

const Sidebar = () => {
  return (
    <section id="sidebar">
      <OrderedPostsList />
      <About />
    </section>
  );
};

export default Sidebar;