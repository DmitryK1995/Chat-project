import React, { useState } from 'react';
import {
  Dropdown,
} from 'react-bootstrap';
import RenameChannel from './renameChannel.jsx';
import RemoveChannel from './removeChannel.jsx';
import initLocales from '../../locales/index.js';

function DropDownMenu({ id, name }) {
  const [showRemove, setShowRemove] = useState(false);
  const [showRename, setShowRename] = useState(false);

  const removeModal = () => {
    setShowRemove(true);
  };

  const renameModal = () => {
    setShowRename(true);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" />
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={removeModal}>{initLocales.t('delete')}</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={renameModal}>{initLocales.t('rename')}</Dropdown.Item>
      </Dropdown.Menu>
      {showRemove ? <RemoveChannel showRemove={showRemove} setShowRemove={setShowRemove} id={id} /> : ''}
      {showRename ? <RenameChannel showRename={showRename} setShowRename={setShowRename} name={name} id={id} /> : ''}
    </Dropdown>
  );
}

export default DropDownMenu;
