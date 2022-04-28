import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, FormControl } from 'react-bootstrap';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { renameChannel } from '../socket.jsx';
import { selectors } from '../../slices/channelsSlice.js';
import initLocales from '../../locales/index.js';

function RenameChannel({
  showRename, setShowRename, name, id,
}) {
  const schema = yup.object().shape({
    channelName: yup.string().trim().required(),
  });
  const [isInvalid, setInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const channels = useSelector(selectors.selectAll);
  const inputRef = useRef();
  const handleClose = () => setShowRename(false);

  useEffect(() => {
    if (showRename) {
      inputRef.current.focus();
    }
  });

  const formik = useFormik({
    initialValues: {
      channelName: name,
    },
    onSubmit: async (values) => {
      const yupCheck = schema.isValidSync(values);
      const nameChannel = values.channelName;
      const repeatNameCheck = channels.find((channel) => channel.name === nameChannel);
      if (repeatNameCheck || !yupCheck) {
        // eslint-disable-next-line no-unused-expressions
        (repeatNameCheck) ? setErrorMessage(initLocales.t('channelExist')) : setErrorMessage(initLocales.t('requiredField'));
        setInvalid(true);
        inputRef.current.select();
      } else {
        renameChannel(id, nameChannel);
        setShowRename(false);
      }
    },
  });

  return (
    <Modal show={showRename} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {initLocales.t('renameChannel')}
        </Modal.Title>
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
            <FormControl.Feedback type="invalid">{errorMessage}</FormControl.Feedback>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {initLocales.t('cancel')}
        </Button>
        <Button type="submit" className="btn btn-primary" onClick={formik.handleSubmit}>{initLocales.t('send')}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RenameChannel;
