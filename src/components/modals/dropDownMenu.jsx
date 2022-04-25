import React, { useState } from 'react';
import {
  Dropdown,
} from 'react-bootstrap';
import RenameChannel from './renameChannel.jsx';
import RemoveChannel from './removeChannel.jsx';

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
      {showRemove ? <RemoveChannel showRemove={showRemove} setShowRemove={setShowRemove} id={id} /> : ''}
      {showRename ? <RenameChannel showRename={showRename} setShowRename={setShowRename} name={name} id={id} /> : ''}
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" />
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={removeModal}>Удалить</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={renameModal}>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDownMenu;
