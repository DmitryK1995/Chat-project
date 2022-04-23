import { io } from 'socket.io-client';
import store from '../slices/index.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const socket = io('ws://localhost:5000');

const sendMessage = (message, username, channelId) => socket.emit('newMessage', { message, username, channelId });

socket.on('newMessage', (messageInfo) => {
  store.dispatch(messagesActions.addMessage(messageInfo));
});

export default sendMessage;
