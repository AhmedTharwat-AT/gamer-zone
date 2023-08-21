import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Library from "./components/Library";
import Content from "./components/Content";
import Footer from "./components/Footer";
import ImagesOverlay from "./components/ImagesOverlay";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faPlaystation,
  faXbox,
  faWindows,
  faApple,
  faLinux,
  faAndroid,
} from "@fortawesome/free-brands-svg-icons";
import {
  faN,
  faMobile,
  faGlobe,
  faBriefcase,
  faPlusCircle,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  fab,
  faPlaystation,
  faXbox,
  faWindows,
  faApple,
  faLinux,
  faAndroid,
  faN,
  faMobile,
  faGlobe,
  faBriefcase,
  faPlusCircle,
  faGamepad
);

function App() {
  const Apikey = process.env.REACT_APP_ApiKey;
  const [data, setData] = useState(null);
  const [currGame, setCurrGame] = useState(null);
  const [imgOverlay, setImgOverlay] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [resetPageToOne, setResetPageToOne] = useState(false);
  const [addedGame, setAddedGame] = useState(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [libraryGames, setLibraryGames] = useState(null);

  async function getData(
    url = `https://rawg.io/api/games?key=${Apikey}&page=1&page_size=16`
  ) {
    const res = await fetch(url);
    const d = await res.json();
    return d;
  }

  //set initial data
  useEffect(() => {
    getData().then((d) => setData(d));
  }, []);

  //add library to local storage
  function initialLibraryGames() {
    localStorage.getItem("library")
      ? libraryGames ||
        setLibraryGames(JSON.parse(localStorage.getItem("library")))
      : localStorage.setItem("library", "[]");
  }

  //add or remove game from library
  useEffect(() => {
    initialLibraryGames();
    if (!addedGame) return;
    const data = JSON.parse(localStorage.getItem("library"));
    const gameIndex = data.findIndex((el) => el.id === addedGame.id);
    gameIndex === -1 ? data.push(addedGame) : data.splice(gameIndex, 1);
    localStorage.setItem("library", JSON.stringify(data));
    setLibraryGames(JSON.parse(localStorage.getItem("library")));
  }, [addedGame]);

  // reset data to default when clicking logo
  function resetData() {
    if (data?.count < 852000 || data.previous)
      getData().then((d) => setData(d));
    searchName && setSearchName("");
    currGame && setCurrGame(null);
    setResetPageToOne(true);
    setShowLibrary(false);
  }

  //fetch page data
  function handlePagination(url) {
    resetPageToOne && setResetPageToOne(false);
    getData(url).then((d) => setData(d));
    window.scrollTo(0, 0);
  }

  function handleClickGame(gId, addToLibrary = false) {
    getData(`https://rawg.io/api/games/${gId}?key=${Apikey}`).then((d) => {
      if (addToLibrary) {
        setAddedGame(d);
      } else {
        setShowLibrary(false);
        setCurrGame(d);
        window.scrollTo(0, 0);
      }
    });
  }

  function handleShowLibrary(show) {
    setShowLibrary(show);
  }

  return (
    <div className="App">
      {data ? (
        <div className="main-wrapper">
          {currGame ? (
            <div
              style={{
                background: ` linear-gradient(0deg, var(--main-color) 10%, transparent),
                url(${currGame.background_image}) center top / cover no-repeat `,
              }}
              className="curr-game-image"
            ></div>
          ) : null}
          {imgOverlay ? (
            <ImagesOverlay setImgOverlay={setImgOverlay} imgs={imgOverlay} />
          ) : null}
          <div className="container">
            <Header
              Apikey={Apikey}
              setData={setData}
              setCurrGame={setCurrGame}
              onClickGame={handleClickGame}
              setSearchName={setSearchName}
              resetData={resetData}
              setResetPageToOne={setResetPageToOne}
              handleShowLibrary={handleShowLibrary}
            />
            <div className="main">
              <Sidebar />
              {showLibrary ? (
                <Library
                  onClickGame={handleClickGame}
                  libraryGames={libraryGames}
                />
              ) : (
                <Content
                  Apikey={Apikey}
                  data={data}
                  handlePagination={handlePagination}
                  currGame={currGame}
                  searchName={searchName}
                  setImgOverlay={setImgOverlay}
                  onClickGame={handleClickGame}
                  resetPageToOne={resetPageToOne}
                  showLibrary={showLibrary}
                />
              )}
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
}

export default App;
