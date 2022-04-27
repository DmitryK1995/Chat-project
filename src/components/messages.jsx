import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import initLocales from '../locales/index.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import Message from './message.jsx';

function Messages() {
  const messagesBox = useRef();
  useEffect(() => {
    messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
  });
  const currentChannelId = useSelector((store) => store.channels.currentChannelId);
  const currentChannel = useSelector(channelsSelectors.selectAll)
    .find(({ id }) => currentChannelId === id);
  const currentChanelName = currentChannel ? currentChannel.name : '';
  const messages = useSelector(messagesSelectors.selectAll)
    .filter(({ channelId }) => Number(channelId) === currentChannelId);
  const messagesCount = messages.length;
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0"><b>{`# ${currentChanelName}`}</b></p>
        <span className="text-muted">{initLocales.t('message', { count: messagesCount })}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messagesBox}>
        {messages.map(({
          message, username, id,
        }) => (
          <Message
            message={message}
            key={id}
            name={username}
          />
        ))}
      </div>

    </>
  );
}

export default Messages;
