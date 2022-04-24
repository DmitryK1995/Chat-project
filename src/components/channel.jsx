import React, { useEffect } from 'react';
import cn from 'classnames';
import store from '../slices/index.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import DropDownMenu from './modals/dropDownMenu.jsx';

function Channel({
  name, id, selected, removable,
}) {
  useEffect(() => {
    store.dispatch(channelsActions.setCurrentChannelId(1));
  }, []);
  const btnSecondary = selected ? 'btn-secondary' : '';
  const mainChannelsClass = cn('w-100', 'rounded-0', 'text-start', 'btn', btnSecondary);
  const addedChannelsClass = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn', btnSecondary);
  const clickHandler = () => store.dispatch(channelsActions.setCurrentChannelId(id));
  return (
    <li className="nav-item w-100">
      { removable
        ? (
          <div role="group" className="d-flex dropdown btn-group">
            <button type="button" className={addedChannelsClass} onClick={clickHandler}>
              <span className="me-1">#</span>
              {name}
            </button>
            <DropDownMenu id={id} name={name} />
          </div>
        )

        : (
          <button type="button" className={mainChannelsClass} onClick={clickHandler}>
            <span className="me-1">#</span>
            {name}
          </button>
        )}
    </li>
  );
}

export default Channel;
