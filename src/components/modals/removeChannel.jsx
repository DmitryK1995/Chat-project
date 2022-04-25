import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { removeChannel } from '../socket.jsx';

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
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    )
  );
}

export default RemoveChannel;
