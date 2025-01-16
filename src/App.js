import React, { useState, useEffect } from 'react';

import { Folder, ActionFolderModal, ErrorMessageModal } from './components';
import {
  fetchFolders, createFolder, renameFolder, deleteFolder,
} from './services';
import { ACTIONS } from './consts';
import './App.scss';

function App() {
  const [folders, setFolders] = useState([]);
  const [isActionFolderModal, setIsActionFolderModal] = useState(false);
  const [isErrorMessageModal, setIsErrorMessageModal] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [currentFolderName, setCurrentFolderName] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [activeFolderId, setActiveFolderId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const loadFolders = async () => {
    try {
      const { children } = await fetchFolders();

      setFolders(children);
    } catch (error) {
      setErrorMessage(error?.response?.data?.data?.message);
    }
  };

  useEffect(() => {
    loadFolders();
  }, []);

  const showHideActionFolderModal = () => setIsActionFolderModal(!isActionFolderModal);

  const showHideErrorMessageModal = () => setIsErrorMessageModal(!isErrorMessageModal);

  const handleAction = (action, id, name) => {
    setCurrentFolderId(id);
    setCurrentFolderName(name);
    setActionMessage(action);
    showHideActionFolderModal();
  };

  const handleSave = async (actionMessage, name) => {
    try {
      switch (actionMessage) {
      case ACTIONS.ADD:
        await createFolder(currentFolderId, name);
        break;
      case ACTIONS.RENAME:
        await renameFolder(currentFolderId, name);
        break;
      case ACTIONS.DELETE:
        await deleteFolder(currentFolderId);
        break;
      default:
        break;
      }

      loadFolders();
    } catch (error) {
      setErrorMessage(error?.response?.data?.data?.message);
      showHideErrorMessageModal();
    }

    showHideActionFolderModal();
  };

  const handleSetActiveFolder = (folderId) => setActiveFolderId(folderId);

  return (
    <>
      <h2>Folder Tree</h2>
      {folders.map((folder) => (
        <Folder
          key={folder.id}
          folder={folder}
          handleAction={handleAction}
          activeFolderId={activeFolderId}
          setActiveFolder={handleSetActiveFolder}
        />
      ))}
      <ActionFolderModal
        isOpen={isActionFolderModal}
        onRequestClose={showHideActionFolderModal}
        onSave={handleSave}
        folderName={currentFolderName}
        actionMessage={actionMessage}
      />
      <ErrorMessageModal
        isOpen={isErrorMessageModal}
        onRequestClose={showHideErrorMessageModal}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
}

export default App;
