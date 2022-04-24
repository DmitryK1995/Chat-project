import { io } from 'socket.io-client';
import store from '../slices/index.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const socket = io();

export const sendMessage = (message, username, channelId) => socket.emit('newMessage', { message, username, channelId });

socket.on('newMessage', (messageInfo) => {
  store.dispatch(messagesActions.addMessage(messageInfo));
});

export const createNewChannel = (name) => socket.emit('newChannel', { name });

socket.on('newChannel', (channelInfo) => {
  const { id } = channelInfo;
  store.dispatch(channelsActions.addChannel(channelInfo));
  store.dispatch(channelsActions.setCurrentChannelId(id));
});

export const removeChannel = (id) => socket.emit('removeChannel', { id });

socket.on('removeChannel', ({ id }) => {
  store.dispatch(channelsActions.removeChannels(id));
  if (store.getState().channels.currentChannelId === id) {
    store.dispatch(channelsActions.setCurrentChannelId(1));
  }
});

export const renameChannel = (id, name) => socket.emit('renameChannel', { id, name });

socket.on('renameChannel', ({ id, name }) => {
  store.dispatch(channelsActions.updateChannel({ id, changes: { name } }));
});
