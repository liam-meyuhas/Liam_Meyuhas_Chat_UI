import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import "./Models.css";
import "./Avatar.css";

const Avatar = ({ setUserIcon }) => {
  const [showModal, setShowModal] = useState(false);
  const [newUserIcon, setNewUserIcon] = useState();

  const openModal = () => {
    setShowModal(true);
  };

  const save = () => {
    setUserIcon(newUserIcon);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (newUserIcon) {
      save();
    }
  }, [newUserIcon]);
  return (
    <div>
      <button className="Button" onClick={openModal}>
        אווטר
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>בחר את האווטר שלך:</p>
            <button
              className="avatar-icons "
              onClick={() => setNewUserIcon("👦🏿")}
            >
              👦🏿
            </button>
            <button
              className="avatar-icons "
              onClick={() => setNewUserIcon("👸🏻")}
            >
              👸🏻
            </button>
            <button
              className="avatar-icons "
              onClick={() => {
                setNewUserIcon("👸🏿");
                save();
              }}
            >
              👸🏿
            </button>

            <button
              className="avatar-icons"
              onClick={() => setNewUserIcon("👦🏻")}
            >
              👦🏻
            </button>
            <button
              className="avatar-icons"
              onClick={() =>
                setNewUserIcon(<FiUser className="icon-profile" />)
              }
            >
              <FiUser />
            </button>

            <div className="save-container">
              <button className="Button" onClick={closeModal}>
                צא
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
