import React, { useState } from "react";
import "./Settings.css";
import { FaRegEdit } from "react-icons/fa";

function Settings({ handleReset }) {
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
    <div className="settings-container">
      <button className="icon-button" onClick={openModal} title="צ'אט חדש">
        <FaRegEdit />
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
}

export default Settings;
