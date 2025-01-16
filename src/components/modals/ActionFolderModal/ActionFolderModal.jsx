import React, { useState } from 'react';
import Modal from 'react-modal';

import { ACTIONS } from '../../../consts';
import './ActionFolderModal.scss';

Modal.setAppElement('#root');

export function ActionFolderModal({
  isOpen, onRequestClose, onSave, folderName, actionMessage,
}) {
  const [name, setName] = useState(folderName);

  const handleSave = () => {
    onSave(actionMessage, name);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleSave}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="header">
        {actionMessage}
      </div>
      {(actionMessage === ACTIONS.DELETE && (
        <div className="body">
          {`Do you want to delete ${folderName}?`}
        </div>
      )) || (
        <div className="body">
          <input
            className="body_input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Folder Name"
          />
        </div>
      )}
      <div className="footer">
        <button className="footer_button" type="button" onClick={onRequestClose}>Cancel</button>
        <button className="footer_button success" type="button" onClick={handleSave}>Save</button>
      </div>
    </Modal>
  );
}
