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
  const faq = {
    "איזה חגים קרובים יש לכל העדות הנפוצות בישראל": `1. חגי היהודים:
  חנוכה: מתחיל ב-25 בנובמבר 2024 (חג האור, נמשך 8 ימים).
  תשעה באב (לפי הלוח העברי): יתקיים ב-15 ביולי 2025 (יום אבלות על חורבן בתי המקדש).
  2. חגי המוסלמים:
  עיד אל-פיטר (חג סיום צום הרמדאן): חוגגים לפי לוח השנה המוסלמי, בערך ב-10 במרץ 2024 (החג משתנה לפי הלוח הלוני).
  עיד אל-אדחא (חג הקורבן): יתחיל ב-5 ביוני 2024 (החג גם הוא משתנה מדי שנה לפי הלוח הלוני).
  3. חגי הנוצרים:
  חג המולד: ב-25 בדצמבר 2024 (חג נוצרי הנחוג בעיקר בחוג המשפחתי).
  חג הפסחא: ב-31 במרץ 2024 (חג שמציין את תחיית ישו, תאריך משתנה מדי שנה).
  4. חגי הדרוזים:
  חג נבי שועיב: ב-18 לדצמבר 2024 (חג הדת הדרוזית, הנחוג לזכרו של הנביא שועיב).
  חג נבי רפיק: יחול ב-4 בינואר 2025 (חג נוסף המוקדש לנביאים הדרוזיים).
  החגים יכולים להשתנות לפי השנה הייחודית והלוח הדתי של כל עדה, ובחלק מהמקרים הם תלויים בלוח השנה הלוני.`,
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
    "כתוב לי קוד בפייתון": `('ברוכים הבאים לכוכב נולד⭐')print 
  //הפקודה תדפיס ברוכים הבאים לכוכב נולד⭐`,
    "תייצר לי סרטון קצר של דגל ישראל מתנופף ברוח": <VideoResponse />,
  };

  const [isLightMode, setIsLightMode] = useState(false);
  const [response, setResponse] = useState([]);
  const [isSidebarOpen, setIsSidebarIsOpen] = useState(false);
  const [botName, setBotName] = useState("כוכב נולד");
  const [isActiveMode, setIsActiveMode] = useState(false);
  const [allChats, setAllChats] = useState([]);
  const [showGif, setShowGif] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(1)

  const toggleSidebar = () => {
    setIsSidebarIsOpen(!isSidebarOpen);
  };

  const handleReset = () => {
    // if (allChats.find((x) => x.id === id)) {}
    // todo: show chat by id
    if (response.length > 0) {
      const chat = {
        id: id,
        responses: response,
        timeStamp: new Date(),
      }
      setId(id + 1)
      setAllChats([...allChats, chat]);
    }
    setResponse([]);
  };

  const showChat = responses => {
    setResponse(responses);
  };

  return (
    <div className={`App ${isLightMode ? "light-mode" : ""}`}>
      <SplashScreen isLoading={isLoading} setIsLoading={setIsLoading} />
      {response.length === 0 && (
        <header className="logo">
          <img src={alpha} alt="alpha Logo" className="alpha-logo" />
          <p className="alpha-name">אלפא</p>
          <span className="beta-tag">Beta</span>
        </header>
      )}
      {response.length === 0 && (
        <span className="App-header">
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
          className={`sidebar-toggle ${isSidebarOpen ? "" : "close"}`}
          onClick={toggleSidebar}
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
  );
}

export default App;
