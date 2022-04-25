import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from '../pages/login.jsx';
import Chat from '../pages/chat.jsx';
import Signup from '../pages/signup.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

function CreateRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

function ErrorPage() {
  return <h1>Страницы не существует!</h1>;
}

export default CreateRoutes;
