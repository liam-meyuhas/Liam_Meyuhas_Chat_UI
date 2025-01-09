import React, {useEffect, useRef, useState} from 'react';
import './Sidebar.css';
import clsx from 'clsx';
import NewChatButton from '../NewChatButton/NewChatButton';
import {MdOutlineDateRange} from 'react-icons/md';
import {dates} from '../../resources/Sidebar';
import {Button} from '@mui/material';

const Sidebar = ({isLightMode, handleReset, allChats, showChat}) => {
  const messagesEndRef = useRef(null);
  const [activeButton, setActiveButton] = useState(null);

  const calculateDaysAgo = timeStamp => {
    const difference = new Date(Date.now() - timeStamp);

    if (difference.getMonth() >= 2) return dates.twoMonths;
    if (difference.getMonth() >= 1) return dates.month;
    if (difference.getDate() >= 28) return dates.fourWeeks;
    if (difference.getDate() >= 21) return dates.threeWeeks;
    if (difference.getDate() >= 14) return dates.twoWeeks;
    if (difference.getDate() >= 7) return dates.week;
    if (difference.getDate() === 2) return dates.yesterday;
    if (difference.getDate() === 1) return dates.today;

    return `לפני ${difference.getDay()} ימים`;
  };

  const groupChatsByDay = chats => {
    return chats.reduce((acc, chat) => {
      const dayTitle = calculateDaysAgo(chat.timeStamp);
      if (!acc[dayTitle]) {
        acc[dayTitle] = [];
      }
      acc[dayTitle].push(chat);
      return acc;
    }, {});
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const handleOnClick = ({id, responses}) => {
    showChat(responses);
    setActiveButton(id);
  };

  useEffect(() => {
    scrollToBottom();
  }, [allChats]);

  return (
    <div className={clsx('sidebar', {'sidebar-light': isLightMode})}>
      <div className="sidebar-content">
        <NewChatButton
          handleReset={handleReset}
          setActiveButton={setActiveButton}
        />
        <div className="button-column">
          {Object.entries(groupChatsByDay(allChats)).map(
            ([dayTitle, chats]) => (
              <div key={dayTitle}>
                <span>
                  {dayTitle} <MdOutlineDateRange/>
                </span>
                {chats.map((chat) => (
                  <Button
                    fullWidth
                    key={chat.id}
                    variant={
                      activeButton === chat.id ? 'contained' : 'outlined'
                    }
                    onClick={() => handleOnClick(chat)}
                    ref={messagesEndRef}
                    color="secondary"
                    sx={{
                      margin: '2px',
                      color: isLightMode ? 'black' : 'white',
                      borderWidth: '2px'
                    }}
                    data-testid="old-chat"
                  >
                    צ'אט
                  </Button>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;