import "./Suggestions.css";
import clsx from "clsx";

function Suggestions({ isLightMode, faq, setResponse, response }) {
  const handleIconClick = (e) => {
    const newObject = {
      input: e.target.textContent,
      answer: faq[e.target.textContent],
    };

    setResponse([...response, newObject]);
  };

  return (
    <div
      className={clsx("suggestions-container", { "light-mode": isLightMode })}
    >
      <button id="pen" className="suggestion purple" onClick={handleIconClick}>
        <span>רעיון לשאלה</span>
      </button>
      <button id="code" className="suggestion purple" onClick={handleIconClick}>
        <span>היכרות עם כוכב נולד</span>
      </button>
      <button id="idea" className="suggestion purple" onClick={handleIconClick}>
        <span>תן לי רעיון לאפליקציה</span>
      </button>
      <button className="suggestion purple" onClick={handleIconClick}>
        <span>למה כדאי לי להשתמש בכוכב נולד</span>
      </button>
    </div>
  );
}

export default Suggestions;
