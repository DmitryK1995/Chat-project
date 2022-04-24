import React, { useEffect, useRef, useState } from 'react';
import {
  FormGroup, FormControl,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { selectors } from '../../slices/channelsSlice.js';
import { createNewChannel } from '../socket.jsx';

function AddNewChannel({ onHide }) {
  const [status, setStatus] = useState(false);
  const channels = useSelector(selectors.selectAll);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: (values) => {
      const nameChannel = values.channelName;
      const repeatNameCheck = channels.find(({ name }) => name === nameChannel);
      if (repeatNameCheck) {
        setStatus(true);
        inputRef.current.select();
      } else {
        createNewChannel(nameChannel);
        onHide(false);
      }
    },
  });

  const handleClose = () => {
    onHide(false);
  };

  return (
    <FormGroup onSubmit={formik.handleSubmit}>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">Добавить канал</div>
              <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick={handleClose} />
            </div>
            <div className="modal-body">
              <form className="">
                <div>
                  <FormControl
                    name="channelName"
                    ref={inputRef}
                    id="name"
                    className="mb-2 form-control"
                    value={formik.values.channelName}
                    onChange={formik.handleChange}
                    isInvalid={status}
                  />
                  <FormControl.Feedback type="invalid">Канал уже существует!</FormControl.Feedback>
                  <FormControl className="visually-hidden" htmlFor="name" />
                  <div className="invalid-feedback" />
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={handleClose}>Отменить</button>
                    <button type="submit" className="btn btn-primary">Отправить</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FormGroup>
  );
}

export default AddNewChannel;
