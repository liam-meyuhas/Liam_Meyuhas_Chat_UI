import React, { useEffect, useRef, useState } from "react";
import "./Sidebar.css";
import clsx from "clsx";
import NewChatButton from "../NewChatButton/NewChatButton";
import { MdOutlineDateRange } from "react-icons/md";
import { dates } from "../../resources/Sidebar";
import { Button } from "@mui/material";

const Sidebar = ({ isLightMode, handleReset, allChats, showChat }) => {
  const messagesEndRef = useRef(null);
  const [activeButton, setActiveButton] = useState(null);

  const calculateDaysAgo = (timeStamp) => {
    const now = new Date();
    const difference = now - new Date(timeStamp);
    const dayInMilliseconds = 1000 * 60 * 60 * 24;
    const daysAgo = Math.floor(difference / dayInMilliseconds);

    if (daysAgo >= 60) return dates.twoMonths;
    if (daysAgo >= 30) return dates.month;
    if (daysAgo >= 28) return dates.fourWeeks;
    if (daysAgo >= 21) return dates.threeWeeks;
    if (daysAgo >= 14) return dates.twoWeeks;
    if (daysAgo >= 7) return dates.week;
    if (daysAgo === 1) return dates.yesterday;
    if (daysAgo === 0) return dates.today;

    return `לפני ${daysAgo} ימים`;
  };

  const groupChatsByDay = (chats) => {
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOnClick = ({ id, responses }) => {
    showChat(responses);
    setActiveButton(id);
  };

  useEffect(() => {
    scrollToBottom();
  }, [allChats]);

  return (
    <div className={clsx("sidebar", { "sidebar-light": isLightMode })}>
      <div className="sidebar-content">
        <NewChatButton
          handleReset={handleReset}
          setActiveButton={setActiveButton}
        />
        <div>
          {Object.entries(groupChatsByDay(allChats)).map(
            ([dayTitle, chats]) => (
              <div key={dayTitle}>
                <span>
                  {dayTitle} <MdOutlineDateRange />
                </span>
                {chats.map((chat) => (
                  <Button
                    fullWidth={true}
                    key={chat.id}
                    variant={
                      activeButton === chat.id ? "contained" : "outlined"
                    }
                    onClick={() => handleOnClick(chat)}
                    ref={messagesEndRef}
                    color="secondary"
                    sx={{
                      margin: "2px",
                      color: isLightMode ? "black" : "white",
                      borderWidth: "2px",
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
