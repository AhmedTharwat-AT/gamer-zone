import { useState } from "react";

export default function Header({ setCurrGame }) {
  const [isDark, setIsDark] = useState(true);
  const doc = document.querySelector(":root");
  function handleDarkMode() {
    if (isDark) {
      doc.style.setProperty("--main-color", "#eeeeee");
      doc.style.setProperty("--font-color", "#222831");
    } else {
      doc.style.setProperty("--main-color", "#222831");
      doc.style.setProperty("--font-color", "#eeeeee");
    }
    setIsDark((d) => !d);
  }
  return (
    <div className="header">
      <ul>
        <li onClick={() => setCurrGame(false)}>
          <h1 className="logo"> G | Z</h1>
        </li>
        <li className="search">
          <input type="text" placeholder="enter game name"></input>
        </li>
        <li>
          <div
            className={`dark-mode ${!isDark ? "dark-clicked" : ""}`}
            onClick={handleDarkMode}
          ></div>
        </li>
        <li className="header-tabs">
          <span className="library">Library 💼</span>
          <span className="welcome-user">Welcome , Ahmed</span>
        </li>
      </ul>
    </div>
  );
}
