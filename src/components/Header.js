import { useEffect, useState } from "react";
import Platforms from "./Platforms";
export default function Header({ setCurrGame, Apikey, onClickGame }) {
  const [isDark, setIsDark] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [allGames, setAllGames] = useState(null);
  const [screenWidth, setScreenWidth] = useState(null);
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

  function closeResults() {
    setAllGames(null);
    setSearchInput("");
  }

  // to close results if didnt chose a result
  useEffect(() => {
    doc.addEventListener("click", (e) => {
      if (e.target.localName == "input") return;
      console.log(e.target);
      closeResults();
    });
  }, []);

  useEffect(() => {
    if (!searchInput) return;
    fetch(`https://rawg.io/api/games?key=${Apikey}&search=${searchInput}`)
      .then((r) => r.json())
      .then((data) => setAllGames(data));
    console.log(screenWidth);
  }, [searchInput]);

  function handleClickResult(e) {
    const clicked = e.target.closest(".result");
    if (!clicked) return;
    onClickGame(clicked.dataset.key);
    setAllGames(null);
    setSearchInput("");
  }

  return (
    <div className="header">
      <ul>
        <li onClick={() => setCurrGame(null)}>
          <h1 className="logo"> G | Z</h1>
        </li>
        <li>
          <div
            className={`search ${
              screenWidth < 900 && searchInput != "" && "small"
            }`}
          >
            <input
              type="text"
              placeholder="enter game name"
              value={searchInput}
              onClick={() => setScreenWidth(window.innerWidth)}
              onChange={(e) => setSearchInput(e.target.value)}
            ></input>
            {allGames && (
              <span onClick={() => closeResults()} className="close-results">
                &times;
              </span>
            )}
            <div className="search-results" onClick={handleClickResult}>
              {allGames &&
                allGames.results.map((game) => {
                  return (
                    <div key={game.id} data-key={game.id} className="result">
                      <img src={game.background_image}></img>
                      <div>
                        <span>{game.name}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
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
