import React from 'react';
import { useNavigate } from 'react-router-dom';
import initLocales from '../locales/index.js';

function Header() {
  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand padding-left: 20px;" style={{ paddingLeft: '20px' }} href="/">Intellex Chat</a>
        {localStorage.getItem('token') ? <button type="button" className="btn btn-primary" style={{ marginRight: '40px' }} onClick={handleExit}>{initLocales.t('exit')}</button> : ''}
      </div>
    </nav>
  );
}

export default Header;
