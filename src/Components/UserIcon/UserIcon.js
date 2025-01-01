import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import "./UserIcon.css";
import ChangeBotName from "../ChangeBotName/ChangeBotName";
import Avatar from "../Avatar/Avatar";
import ActiveMode from "../ActiveMode/ActiveMode";

const UserIcon = ({ setIsLightMode, setBotName, botName, setIsActiveMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMode = () => {
    setIsLightMode((prevMode) => !prevMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [userIcon, setUserIcon] = useState(() => (
    <FiUser className="icon-profile" />
  ));

  return (
    <div className="theme-container">
      <button
        className="profile"
        onClick={toggleMenu}
        title="ליאם מיוחס/יחידת אוצר/צוות מטמון"
      >
        <span className="avatar-icon-profile">{userIcon}</span>
      </button>

      {menuOpen && (
        <div className="user-container">
          <button className="Button" onClick={toggleMode}>
            ערכת נושא
          </button>
          <ChangeBotName setBotName={setBotName} />
          <Avatar setUserIcon={setUserIcon} />
          <ActiveMode setIsActiveMode={setIsActiveMode} />
        </div>
      )}
    </div>
  );
};
export default UserIcon;
