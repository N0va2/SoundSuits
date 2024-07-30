import './App.css';
import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import Profile from './Profile';

function App() {
  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="App">
        <header className = "App-header">
          <h1>Sound Suits</h1>
          <button onClick={handleLogin} style={{ border: 'none', background: 'none' }}>
            <img src="SpotiButton.png" alt="Log in to Spotify" style={{ width: 'auto', height: 'auto' }} />
          </button>
        </header>
        <Routes>
          <Route path="/profile" component={Profile} />
          <Route path = "/" component={Home} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  const history = useNavigate();

  useEffect(() => {
    const accessToken = new URLSearchParams(window.location.search).get('access_token');
    if (accessToken) {
      history.push('/profile?access_token=${accessToken}');
    }
  }, [history]);

  return (
    <div className="home">
      <h2>Welcome to Sound Suits</h2>
    </div>
  );
}

export default App;
