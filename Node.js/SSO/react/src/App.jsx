import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const token = location.search.split("=")[1];
  if (!token) {
    fetch("http://localhost:3000/login?appId=Rs6s2aHi").then((res) => {
      location.href = res.url;
    });
  }

  return (
    <>
      <div>react 教育 5173</div>
    </>
  );
}

export default App;
