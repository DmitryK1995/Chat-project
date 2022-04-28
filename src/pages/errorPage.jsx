import React from 'react';
import Header from './Header.jsx';

function ErrorPage() {
  return (
    <>
      <Header />
      <div className="text-center row align-content-center h-100">
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">
          Но вы можете перейти
          {' '}
          <a href="/">на главную страницу</a>
        </p>

      </div>
    </>
  );
}

export default ErrorPage;
