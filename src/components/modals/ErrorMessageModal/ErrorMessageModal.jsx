import React from 'react';
import Modal from 'react-modal';

import './ErrorMessageModal.scss';

Modal.setAppElement('#root');

export function ErrorMessageModal({ isOpen, onRequestClose, errorMessage }) {
  const handleCancelModal = () => onRequestClose();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCancelModal}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="body">
        {errorMessage}
      </div>
      <div className="footer">
        <button className="footer_button" type="button" onClick={handleCancelModal}>Close</button>
      </div>
    </Modal>
  );
}
