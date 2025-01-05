import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getUsers")
      .then((name) => setName(name.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div data-testid="app">
      <header>
        {name.map((name) => {
          return <p>{name.name}</p>;
        })}
      </header>
    </div>
  );
}

export default App;
