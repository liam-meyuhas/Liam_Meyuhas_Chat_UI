import React, { useState } from "react";
import { RiChatNewLine } from "react-icons/ri";
import "./NewChatButton.css";
import "../GlobalCss/Modals.css";
import {Button} from '@mui/material';

const NewChatButton = ({ handleReset, setActiveButton }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const newChatId = -1;

  const confirmReset = () => {
    handleReset();
    setActiveButton(newChatId);
    setShowModal(false);
  };

  return (
    <>
      <Button onClick={openModal} data-testid="new-chat">
        שיחה חדשה
        <RiChatNewLine className="icon-new-chat" />
      </Button>
      {showModal && (
        <div className="modal">
          <div className="modal-content" data-testid="modal-content">
            <p>אתה בטוח שאתה רוצה למחוק את הצאט</p>
            <Button onClick={confirmReset} data-testid="confirm-reset">
              כן
            </Button>
            <button onClick={closeModal} data-testid="cancel-reset">
              לא
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewChatButton;
