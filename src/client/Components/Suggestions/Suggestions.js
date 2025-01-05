import "./Suggestions.css";
import clsx from "clsx";

function Suggestions({ isLightMode, faq, setResponse, response }) {
  const handleIconClick = (e) => {
    const newObject = {
      input: e.target.textContent,
      answer: faq[e.target.textContent],
    };

    const sendToServer = async () => {
      try {
        const response = await fetch("http://localhost:5000/QnA", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: e.target.textContent,
            answer: faq[e.target.textContent],
            date: new Date().toLocaleString("he-IL", { hour12: false }),
          }),
        });
        const data = await response.json();
        console.log("QnA sent successfully:", data);
      } catch (error) {
        console.error("Error sending QnA:", error);
      }
    };

    sendToServer();

    setResponse([...response, newObject]);
  };

  return (
    <div
      className={clsx("suggestions-container", {
        "light-mode": isLightMode,
      })}
    >
      <button id="pen" className="suggestion purple" onClick={handleIconClick} data-testid="question-suggestion">
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
