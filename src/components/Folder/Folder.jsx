import React, { useState } from 'react';
import {
  FiPlus, FiEdit, FiTrash, FiChevronDown, FiChevronRight,
} from 'react-icons/fi';

import { ACTIONS } from '../../consts';
import './Folder.scss';

export function Folder({
  folder, handleAction, activeFolderId, setActiveFolder,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => setIsOpen(!isOpen);

  const handleFolderClick = (e) => {
    e.stopPropagation();
    setActiveFolder(folder.id);
  };

  const isActive = folder.id === activeFolderId;

  return (
    <div className={`folder ${isActive ? 'active' : ''}`} onClick={handleFolderClick}>
      <div className="body">
        {folder?.children?.length > 0
                    && (
                      <div className="folder_isopen" onClick={toggleFolder}>
                        {(isOpen && (<FiChevronDown />)) || (<FiChevronRight />)}
                      </div>
                    )}
        <span className="folder_name">{folder.name}</span>
        {isActive && (
          <div className="folder_actions">
            <button className="folder_actions_button" type="button" onClick={() => handleAction(ACTIONS.ADD, folder.id)}>
              <FiPlus />
            </button>
            <button className="folder_actions_button" type="button" onClick={() => handleAction(ACTIONS.RENAME, folder.id, folder.name)}><FiEdit /></button>
            <button className="folder_actions_button" type="button" onClick={() => handleAction(ACTIONS.DELETE, folder.id, folder.name)}><FiTrash /></button>
          </div>
        )}
      </div>
      {isOpen && folder?.children.map((child) => (
        <Folder
          key={child.name}
          folder={child}
          handleAction={handleAction}
          activeFolderId={activeFolderId}
          setActiveFolder={setActiveFolder}
        />
      ))}
    </div>
  );
}
