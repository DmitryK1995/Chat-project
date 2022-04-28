import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { removeChannel } from '../socket.jsx';
import initLocales from '../../locales/index.js';

function RemoveChannel({ showRemove, setShowRemove, id }) {
  const handleClose = () => setShowRemove(false);
  const handleDelete = () => {
    removeChannel(id);
    setShowRemove(false);
  };

  return (
    (
      <Modal show={showRemove} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {initLocales.t('deleteChannel')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {initLocales.t('cancel')}
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            {initLocales.t('delete')}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}

export default RemoveChannel;
