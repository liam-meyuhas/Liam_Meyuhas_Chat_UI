import React, { useState } from "react";
import "./App.css";
import ChatInput from "./Components/ChatInput/ChatInput";
import alpha from "./images/alpha.png";
import Suggestions from "./Components/Suggestions/Suggestions";
import Sidebar from "./Components/Sidebar/Sidebar";
import { PiLineVerticalBold } from "react-icons/pi";
import UserIcon from "./Components/UserIcon/UserIcon";
import ImageResponse from "./Components/ImageResponse/ImageResponse";
import VideoResponse from "./Components/VideoResponse/VideoResponse";
import SplashScreen from "./Components/SplashScreen/SplashScreen";

function App() {
  const [faq, setFaq] = useState({
    "What time is it?": "The current time is...",
    "מה מזג האוויר?": "מזג האוויר כרגע הוא...",
    "What is your name?": "My name is Alpha",
    "מהי בירת ישראל?": "בירת ישראל היא ירושלים",
    "איך קוראים לך?": "השם שלי הוא אלפא",
    "What is the capital of Israel?": "The capital of Israel is Jerusalem.",
    "תן לי רעיון לאפליקציה":
      "מה דעתך על אפליקציה לארגון מטלות יומית עם תזכורות חכמות?",
    "היכרות עם כוכב נולד":
      "כוכב נולד הוא העוזר האישי שלך שמיועד להעשיר את חוויית השימוש שלך ולספק מידע מגוון.",
    "למה כדאי לי להשתמש בכוכב נולד":
      "כוכב נולד הוא העוזר האישי המושלם, המספק מידע, עוזר במשימות יומיות, ומציע רעיונות והשראה בכל נושא.",
    "רעיון לשאלה": "מה דעתך על השאלה: 'איך כדאי להתכונן לריאיון עבודה?'",
    "תייצר לי תמונה של שועל מטייל ביער, צבעוני, זווית צילום רחבה": (
      <ImageResponse />
    ),
    "כתוב לי קוד בפייתון": `('ברוכים הבאים לכוכב נולד⭐')print //הפקודה תדפיס ברוכים הבאים לכוכב נולד⭐`,
    "תייצר לי סרטון קצר של דגל ישראל מתנופף ברוח": <VideoResponse />,
  });

  const [isLightMode, setIsLightMode] = useState(true);
  const [response, setResponse] = useState([]);
  const [isSidebarOpen, setIsSidebarIsOpen] = useState(false);
  const [botName, setBotName] = useState("כוכב נולד");
  const [isActiveMode, setIsActiveMode] = useState(false);
  const [allChats, setAllChats] = useState([]);
  const [showGif, setShowGif] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(1);

  const toggleSidebar = () => {
    setIsSidebarIsOpen(!isSidebarOpen);
  };

  const handleReset = () => {
    if (response.length > 0) {
      const chat = {
        id: id,
        responses: response,
        timeStamp: new Date(),
      };
      setId(id + 1);
      setAllChats([chat, ...allChats]);
    }
    setResponse([]);
  };

  const showChat = (responses) => {
    setResponse(responses);
  };

  return (
    <div className={`App ${isLightMode ? "light-mode" : ""}`} data-testid="app">
      <SplashScreen isLoading={isLoading} setIsLoading={setIsLoading} />
      <div className="header-logo">
        <header className="logo">
          <img src={alpha} alt="alpha Logo" className="alpha-logo" />
          <p className="alpha-name">אלפא</p>
          <span className="beta-tag">Beta</span>
        </header>
      </div>
      <div className="app-body">
        {response.length === 0 && (
          <span className="botname">
            <h1>{botName}</h1>
          </span>
        )}

        {response.length === 0 && (
          <Suggestions
            isLightMode={isLightMode}
            response={response}
            setResponse={setResponse}
            faq={faq}
          />
        )}
        <div className="chatInput-container">
          <ChatInput
            response={response}
            setResponse={setResponse}
            isLightMode={isLightMode}
            isActiveMode={isActiveMode}
            showGif={showGif}
            setShowGif={setShowGif}
            faq={faq}
          />
        </div>
        <div className="sidebar-app">
          {isSidebarOpen ? (
            <Sidebar
              isLightMode={isLightMode}
              handleReset={handleReset}
              allChats={allChats}
              showChat={showChat}
            />
          ) : (
            ""
          )}
          <button
            className={`sidebar-toggle ${isSidebarOpen ? "open" : ""}`}
            onClick={toggleSidebar}
            data-testid="sidebar-toggle"
          >
            <PiLineVerticalBold />
          </button>
        </div>
        <UserIcon
          setIsLightMode={setIsLightMode}
          setBotName={setBotName}
          botName={botName}
          setIsActiveMode={setIsActiveMode}
        />
      </div>
    </div>
  );
}

export default App;
