import React, { useState, useEffect } from "react";
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

  const [response, setResponse] = useState([]);
  const [isSidebarOpen, setIsSidebarIsOpen] = useState(false);
  const [isActiveMode, setIsActiveMode] = useState(false);
  const [allChats, setAllChats] = useState([]);
  const [showGif, setShowGif] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(1);
  const [isLightMode, setIsLightMode] = useState(true);
  const [botName, setBotName] = useState("");
  const [fname, setFname] = useState("");

  const initalUserPath = "ליאם מיוחס / יחידת אוצר / צוות מטמון";

  const initalBotName = (initalUserPath) => {
    const userPath = initalUserPath.split("/");

    return userPath[0].trim();
  };

  const initialName = initalBotName(initalUserPath);

  const [timeOfDay, setTimeOfDay] = useState("");

  const getTimeOfDay = () => {
    const hours = new Date().getHours();

    if (hours >= 0 && hours < 12) {
      setTimeOfDay(" בוקר טוב ");
    } else if (hours >= 12 && hours < 18) {
      setTimeOfDay(" צהריים טובים ");
    } else {
      setTimeOfDay(" ערב טוב ");
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/botname")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBotName(data.name); // שמירת שם הבוט
        setFname(data.fname); // שמירת fname
      })
      .catch((error) => console.error("Error fetching botname:", error));

    getTimeOfDay();
    const intervalId = setInterval(getTimeOfDay, 60000);
    return () => clearInterval(intervalId);
  }, []);

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
          <span className="beta-tag">Beta</span>
        </header>
      </div>
      <div className="app-body">
        {response.length === 0 && (botName || fname) && (
          <span className="botname">
            <h1>
              {timeOfDay}
              {botName ? botName : fname}...
            </h1>
          </span>
        )}
        <>
          {response.length === 0 && (
            <Suggestions
              isLightMode={isLightMode}
              response={response}
              setResponse={setResponse}
              faq={faq}
            />
          )}
        </>
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
