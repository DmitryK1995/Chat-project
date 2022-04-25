import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import initLocales from '../locales/index.js';
import routes from '../routes.js';

function LoginPage() {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const loginPath = routes.loginPath();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const data = await axios.post(loginPath, values);
        const { token, username } = JSON.parse(data.request.response);
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        navigate('/');
      } catch (err) {
        setAuthFailed(true);
        inputRef.current.select();
      }
    },
  });

  return (
    <>
      <Header />
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Form onSubmit={formik.handleSubmit} className="p-3">
                <h1 className="text-center mb-4">{initLocales.t('enter')}</h1>
                <Form.Group>
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="Ваш ник"
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    ref={inputRef}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    type="password"
                    placeholder={initLocales.t('password')}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                  />
                  <div className="text-danger">
                    {authFailed ? 'Неверные имя пользователя или пароль' : ''}
                  </div>
                </Form.Group>
                <Button type="submit" variant="outline-primary" style={{ marginTop: '30px' }}>{initLocales.t('enter')}</Button>
              </Form>
            </div>
            <div className="text-center" style={{ paddingBottom: '40px' }}>
              <span>Нет аккаунта?</span>
              {' '}
              <a href="/signup">{initLocales.t('registration')}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
