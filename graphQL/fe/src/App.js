// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import Posts from './components/Posts';
import UserPosts from './components/UserPosts';  // 추가될 컴포넌트
import UserDetail from './components/UserDetail';  // 추가될 컴포넌트

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/user/:userId" element={<UserDetail />} />
          <Route path="/user/:userId/posts" element={<UserPosts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
