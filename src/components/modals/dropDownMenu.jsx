import React, { useState, useRef } from 'react';
import {
  Dropdown, Modal, Button, FormControl,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { removeChannel, renameChannel } from '../socket.jsx';
import { selectors } from '../../slices/channelsSlice.js';

function DropDownMenu({ id, name }) {
  const channels = useSelector(selectors.selectAll);
  const inputRef = useRef();
  const [isInvalid, setInvalid] = useState(false);
  const [show, setShow] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const handleClose = () => setShow(false);
  const handleClosez = () => setShowRename(false);

  const dropMenuClick = () => {
    setShow(true);
  };

  const renameModalOpen = () => {
    setShowRename(true);
  };

  const handleDelete = () => {
    removeChannel(id);
    setShow(false);
  };

  const formik = useFormik({
    initialValues: {
      channelName: name,
    },
    onSubmit: (values) => {
      const nameChannel = values.channelName;
      const repeatNameCheck = channels.find((channel) => channel.name === nameChannel);
      if (repeatNameCheck) {
        setInvalid(true);
        inputRef.current.select();
      } else {
        renameChannel(id, nameChannel);
        setShowRename(false);
      }
    },
  });

  return (
    <Dropdown>
      {show ? (
        <Modal show={show} onHide={handleClose}>
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
      ) : ''}
      {showRename ? (
        <Modal show={showRename} onHide={handleClosez}>
          <Modal.Header closeButton>
            <Modal.Title>Переименовать канал</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
              <div className="input-group has-validation">
                <FormControl
                  name="channelName"
                  className="form-control my-2"
                  ref={inputRef}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.channelName}
                  isInvalid={isInvalid}
                />
                <FormControl.Feedback type="invalid">Канал с таким именем уже существует!</FormControl.Feedback>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosez}>
              Отменить
            </Button>
            <Button type="submit" className="btn btn-primary" onClick={formik.handleSubmit}>Отправить</Button>
          </Modal.Footer>
        </Modal>
      ) : ''}
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" />
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={dropMenuClick}>Удалить</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={renameModalOpen}>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDownMenu;
