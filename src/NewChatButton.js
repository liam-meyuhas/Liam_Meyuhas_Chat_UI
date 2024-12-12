import React, { useState } from "react";
import { RiChatNewLine } from "react-icons/ri";
import "./NewChatButton.css";
import "./Models.css";

const NewChatButton = ({ handleReset }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmReset = () => {
    handleReset();
    setShowModal(false);
  };

  return (
    <div>
      <button className="new-chat" onClick={openModal}>
        שיחה חדשה
        <RiChatNewLine className="icon-new-chat" />
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>אתב בטוח שאתה רוצה למחוק את הצאט</p>
            <button className="Button" onClick={confirmReset}>
              כן
            </button>
            <button className="Button" onClick={closeModal}>
              לא
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewChatButton;
