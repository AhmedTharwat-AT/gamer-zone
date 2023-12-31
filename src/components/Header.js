import { useEffect, useState } from "react";
import Platforms from "./Platforms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Header({
  setCurrGame,
  Apikey,
  onClickGame,
  setData,
  setSearchName,
  resetData,
  setResetPageToOne,
  handleShowLibrary,
  showLibrary,
  handleShowSignUp,
  showSignUp,
  logged,
  handleSignOut,
  handleShowUser,
}) {
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

  // to close results when click outside search results
  useEffect(() => {
    doc.addEventListener("click", (e) => {
      if (e.target.localName == "input") return;
      closeResults();
    });
  }, []);

  useEffect(() => {
    if (!searchInput) return;
    fetch(`https://rawg.io/api/games?key=${Apikey}&search=${searchInput}`)
      .then((r) => r.json())
      .then((data) => setAllGames(data));
  }, [searchInput]);

  function handleClickResult(e) {
    const clicked = e.target.closest(".result");
    if (!clicked) return;
    onClickGame(clicked.dataset.key);
    closeResults();
    handleShowLibrary(false);
  }

  function handleShowAllResults() {
    setData(allGames);
    setSearchName(searchInput);
    setResetPageToOne(true);
    handleShowLibrary(false);
  }

  function handleLogoClick() {
    allGames && closeResults();
    resetData();
  }

  return (
    <div className="header">
      <ul>
        <li onClick={handleLogoClick}>
          <h1 className="logo"> G | Z</h1>
        </li>
        <li>
          <div
            className={`search ${
              screenWidth < 900 && searchInput != "" && "small"
            }`}
          >
            <div className="input-close-wrapper">
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
            </div>
            <div
              className="search-results"
              style={searchInput ? { padding: "7px" } : {}}
              onClick={handleClickResult}
            >
              {allGames && searchInput != "" && (
                <>
                  <span className="results-count">
                    Games results : {allGames.count}
                  </span>
                  {allGames.results
                    .map((game) => {
                      return (
                        <div
                          key={game.id}
                          data-key={game.id}
                          className="result"
                        >
                          <img src={game.background_image}></img>
                          <div>
                            <span>{game.name}</span>
                          </div>
                        </div>
                      );
                    })
                    .slice(0, 10)}
                  {allGames.results.length >= 2 ? (
                    <>
                      <hr></hr>
                      <span
                        className="show-all-results"
                        onClick={handleShowAllResults}
                      >
                        Show All
                      </span>
                    </>
                  ) : null}
                </>
              )}
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
          {logged?.name ? (
            <>
              <div className="welcome-user" onClick={handleShowUser}>
                <img src={logged.img}></img>
                <span className="nav-btn">Welcome , {logged.name}</span>
              </div>
              <span
                className={`nav-btn ${showLibrary && "selected"}`}
                onClick={() => handleShowLibrary(true)}
              >
                Library 💼
              </span>
              <div className="sign-out" onClick={handleSignOut}>
                <FontAwesomeIcon icon="fa-solid fa-power-off fa-3x" />
              </div>
            </>
          ) : (
            <span
              className={`nav-btn ${showSignUp && "selected"}`}
              onClick={handleShowSignUp}
            >
              Sign-up 📝
            </span>
          )}
        </li>
      </ul>
    </div>
  );
}
