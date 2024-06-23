import React from 'react';
import '../styles/modal.css';

const Modal = (props) => {

    const { show, handleClose, children } = props;

  return (
    <div className={show ? "modal display-block" : "modal display-none"}>
    <div className='cetermodal'>
      <div className="modal-main">
        {children}
        <div className='form-button'>
        <button onClick={handleClose} className="close-button">Edit Form</button>
        <button onClick={handleClose} className="close-button">Submit Form</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Modal;