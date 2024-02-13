import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu1 from './components/menu/Menu1';
import Menu2 from './components/menu/Menu2';
import MovieSearch from './components/MovieSearch';
import StreamingSearch from './components/StreamingSearch';
import Watchlist from './components/Watchlist';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import Home from './components/Home';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setIsAuthenticated(!!storedToken);
  }, []);

  return (
    <div>
      <Router>
        {isAuthenticated ? <Menu2 /> : <Menu1 />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/streamingSearch" element={<StreamingSearch />} />
          <Route path="/movieSearch" element={<MovieSearch />} />
          {isAuthenticated ? (
            <>
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/logout" element={<Logout />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
