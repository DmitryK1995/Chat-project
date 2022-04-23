import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/messagesSlice.js';
import Message from './message.jsx';

function Messages() {
  const messages = useSelector(selectors.selectAll);
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0"><b># general</b></p>
        <span className="text-muted">170 сообщений</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {messages.map(({
          message, username, channelId, id,
        }) => (
          <Message
            message={message}
            channelId={channelId}
            key={id}
            name={username}
          />
        ))}
      </div>

    </>
  );
}

export default Messages;
