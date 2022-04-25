import React, { useEffect, useRef, useState } from 'react';
import {
  FormGroup, FormControl,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { selectors } from '../../slices/channelsSlice.js';
import { createNewChannel } from '../socket.jsx';
import initLocales from '../../locales/index.js';

function AddNewChannel({ onHide }) {
  const schema = yup.object().shape({
    channelName: yup.string().trim().required(),
  });
  const [status, setStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const channels = useSelector(selectors.selectAll);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: async (values) => {
      const yupCheck = schema.isValidSync(values);
      const nameChannel = values.channelName;
      const repeatNameCheck = channels.find(({ name }) => name === nameChannel);
      if (repeatNameCheck || !yupCheck) {
        // eslint-disable-next-line no-unused-expressions
        (repeatNameCheck) ? setErrorMessage('Канал с таким именем уже существует!') : setErrorMessage('Обязательное поле');
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
              <div className="modal-title h4">
                {initLocales.t('add')}
                {' '}
                {initLocales.t('channel')}
              </div>
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
                  <FormControl.Feedback type="invalid">{errorMessage}</FormControl.Feedback>
                  <FormControl className="visually-hidden" htmlFor="name" />
                  <div className="invalid-feedback" />
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={handleClose}>{initLocales.t('cancel')}</button>
                    <button type="submit" className="btn btn-primary">{initLocales.t('send')}</button>
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
