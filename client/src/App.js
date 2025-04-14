import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/NavbarComponents/Navbar/Navbar';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Template from './pages/Template';
import NotFound from './pages/NotFound';
import CreateTemplate from './pages/CreateTemplate';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {localStorage.getItem('key') && JSON.parse(localStorage.getItem('key')).value != null &&
          <Route path="/profile/:id" element={<Profile />} />
        }
        <Route path="/template/:id" element={<Template />} />
        <Route path="/create" element={<CreateTemplate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;