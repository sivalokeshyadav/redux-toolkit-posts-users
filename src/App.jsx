import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Users from "./users/users";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Users />
    </>
  );
}

export default App;
