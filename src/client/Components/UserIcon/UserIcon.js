import React, {useState} from 'react';
import {FiUser} from 'react-icons/fi';
import './UserIcon.css';
import ChangeBotName from '../ChangeBotName/ChangeBotName';
import Avatar from '../Avatar/Avatar';
import ActiveMode from '../ActiveMode/ActiveMode';
import ToggleTheme from '../ThemeToggle/ToggleTheme';

const UserIcon = ({isLightMode, setIsLightMode, setBotName, setIsActiveMode}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [userIcon, setUserIcon] = useState(() => (
    <FiUser className="icon-profile"/>
  ));

  return (
    <div className="theme-container">
      {menuOpen && (
        <div className="user-container">
          <ToggleTheme isLightMode={isLightMode} setIsLightMode={setIsLightMode}/>
          <ChangeBotName setBotName={setBotName}/>
          <Avatar setUserIcon={setUserIcon}/>
          <ActiveMode setIsActiveMode={setIsActiveMode}/>
        </div>
      )}
      <button
        className="profile"
        onClick={toggleMenu}
        title="ליאם מיוחס/יחידת אוצר/צוות מטמון"
        data-testid="user-icon"
      >
        <span className="avatar-icon-profile">{userIcon}</span>
      </button>
    </div>
  );
};

export default UserIcon;