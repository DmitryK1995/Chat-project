import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { sendMessage } from './socket.jsx';
import initLocales from '../locales/index.js';

function Input() {
  const [message, setMessage] = useState('');
  const [isEnabled, setState] = useState(true);
  const input = useRef();
  const { username } = localStorage;
  const currentId = useSelector((store) => store.channels.currentChannelId);

  useEffect(() => {
    if (message.length !== 0) {
      return setState(false);
    }
    return setState(true);
  });

  const handlerSumbit = (e) => {
    e.preventDefault();
    input.current.focus();
    sendMessage(message, username, currentId);
    setMessage('');
  };

  return (
    <form onSubmit={handlerSumbit} noValidate="" className="py-1 border rounded-2">
      <div className="input-group has-validation">
        <input
          name="body"
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2 form-control"
          ref={input}
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <button type="submit" disabled={isEnabled} className="btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
          <span className="visually-hidden">{initLocales.t('send')}</span>
        </button>
      </div>
    </form>
  );
}

export default Input;
