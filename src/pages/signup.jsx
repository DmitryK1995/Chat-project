/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import * as yup from 'yup';
import cn from 'classnames';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header.jsx';
import initLocales from '../locales/index.js';

function Signup() {
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const classNameField = cn('form-control', isValid ? 'is-invalid' : '');
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().trim().required().min(3)
      .max(20),
    password: yup.string().required().min(6),
    confirmPassword: yup.string()
      .required('password confirmation is a required field')
      .oneOf([yup.ref('password'), null], 'password confirmation does not match to password'),
  });
  console.log(localStorage);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (fields) => {
      try {
        schema.validateSync(fields);
        setErrorMessage('');
        setIsValid(false);
        await axios.post('/api/v1/signup', fields);
        navigate('/login');
      } catch (e) {
        setIsValid(true);
        setErrorMessage(e.message);
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
              <form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{initLocales.t('registration')}</h1>
                <div className="form-floating mb-3">
                  <input
                    placeholder="От 3 до 20 символов"
                    name="username"
                    autoComplete="username"
                    required=""
                    id="username"
                    onChange={formik.handleChange}
                    className={classNameField}
                    value={formik.values.username}
                  />
                  <label className="form-label" htmlFor="username">{initLocales.t('userName')}</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    placeholder="Не менее 6 символов"
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required=""
                    autoComplete="new-password"
                    type="password"
                    id="password"
                    onChange={formik.handleChange}
                    className={classNameField}
                    value={formik.values.password}
                  />
                  <label className="form-label" htmlFor="password">{initLocales.t('password')}</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    placeholder="Пароли должны совпадать"
                    name="confirmPassword"
                    required=""
                    autoComplete="new-password"
                    type="password"
                    id="confirmPassword"
                    onChange={formik.handleChange}
                    className={classNameField}
                    value={formik.values.confirmPassword}
                  />
                  <div className="text-danger">
                    {errorMessage}
                  </div>
                  <label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</label>
                </div>
                <button type="submit" className="w-100 btn btn-outline-primary">Зарегистрироваться</button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Signup;
