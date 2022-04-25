import React, { useEffect } from 'react';
import axios from 'axios';
import {
  useNavigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import Channels from '../components/channels.jsx';
import Header from './Header.jsx';
import Messages from '../components/messages.jsx';
import Input from '../components/input.jsx';
import routes from '../routes.js';

function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataPath = routes.dataPath();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);
  const token = localStorage.getItem('token');
  const auth = { Authorization: `Bearer ${token}` };
  const fetchContent = async () => {
    const { data } = await axios.get(dataPath, { headers: auth });
    dispatch(channelsActions.addChannels(data.channels));
    dispatch(messagesActions.addMessages(data.messages));
  };

  fetchContent();
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <Messages />
              <div className="mt-auto px-5 py-3">
                <Input />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
