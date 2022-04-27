import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import LoginPage from '../pages/login.jsx';
import Chat from '../pages/chat.jsx';
import Signup from '../pages/signup.jsx';
import ErrorPage from '../pages/errorPage.jsx';
import store from '../slices/index.js';

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

const entryElement = document.querySelector('#chat');

// eslint-disable-next-line react/no-render-return-value
const render = () => ReactDOM.render(
  <Provider store={store}>
    <CreateRoutes />
  </Provider>,
  entryElement,
);

export default render;
