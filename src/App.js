import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
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
  //add game to library when added
  useEffect(() => {
    if (!addedGame) return;
    let library = localStorage.getItem("library");
    if (!library) {
      localStorage.setItem("library", "[]");
      library = localStorage.getItem("library");
    }
    const data = JSON.parse(library);
    if (!data.find((el) => el.id === addedGame.id)) {
      data.push(addedGame);
      localStorage.setItem("library", JSON.stringify(data));
    }
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
              <Content
                Apikey={Apikey}
                data={data}
                handlePagination={handlePagination}
                currGame={currGame}
                searchName={searchName}
                setImgOverlay={setImgOverlay}
                onClickGame={handleClickGame}
                resetPageToOne={resetPageToOne}
              />
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
