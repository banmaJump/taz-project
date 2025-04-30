import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Foot from './components/Foot';
import PostDetail from './components/PostDetail';
import './styles/sass/App.scss';

const App = () => {
  return (
    <Router>
      <div id="wrapper">
        <Header />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
        <Sidebar />
        <Foot />
      </div>
    </Router>
  );
};

export default App;