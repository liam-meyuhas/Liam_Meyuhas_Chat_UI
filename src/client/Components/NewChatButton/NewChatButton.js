import React, { useState } from "react";
import { RiChatNewLine } from "react-icons/ri";
import "./NewChatButton.css";
import "../GlobalCss/Modals.css";

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
      <button className="new-chat" onClick={openModal} data-testid="new-chat">
        שיחה חדשה
        <RiChatNewLine className="icon-new-chat" />
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content" data-testid="modal-content">
            <p>אתה בטוח שאתה רוצה למחוק את הצאט</p>
            <button className="Button" onClick={confirmReset} data-testid="confirm-reset">
              כן
            </button>
            <button className="Button" onClick={closeModal} data-testid="cancel-reset">
              לא
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewChatButton;
