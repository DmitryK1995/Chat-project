import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { renameChannel } from '../socket.jsx';
import { selectors } from '../../slices/channelsSlice.js';

function RenameChannel({
  showRename, setShowRename, name, id,
}) {
  const [isInvalid, setInvalid] = useState(false);
  const channels = useSelector(selectors.selectAll);
  const inputRef = useRef();
  const handleClosez = () => setShowRename(false);

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
  );
}

export default RenameChannel;
