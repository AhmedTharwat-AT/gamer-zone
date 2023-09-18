import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Library from "./components/Library";
import Content from "./components/Content";
import Footer from "./components/Footer";
import ImagesOverlay from "./components/ImagesOverlay";
import Swal from "sweetalert2";
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
  faCircleCheck,
  faMobile,
  faGlobe,
  faBriefcase,
  faPlusCircle,
  faGamepad,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import User from "./components/User";
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
  faCircleCheck,
  faGamepad,
  faPowerOff
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
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [logged, setLogged] = useState(null);
  const [showUser, setShowUser] = useState(false);

  async function getData(
    url = `https://rawg.io/api/games?key=${Apikey}&page=1&page_size=16`
  ) {
    const res = await fetch(url);
    const d = await res.json();
    return d;
  }

  //set library games if exist
  function initialLibraryGames() {
    const lib = JSON.parse(localStorage.getItem("logged"))?.library;
    lib && setLibraryGames(lib);
  }

  //set initial data
  useEffect(() => {
    getData().then((d) => setData(d));
    const isLogged = JSON.parse(localStorage.getItem("logged"));
    setLogged(isLogged);
    isLogged && initialLibraryGames();
  }, []);

  //update logged user in local storage
  function UpdateUsers(newLogged) {
    localStorage.setItem("logged", JSON.stringify(newLogged));
    const users = JSON.parse(localStorage.getItem("users"));
    const newUsers = users.map((el) =>
      el.name === newLogged.name ? newLogged : el
    );
    localStorage.setItem("users", JSON.stringify(newUsers));
  }

  //add or remove game from library
  useEffect(() => {
    if (!addedGame) return;
    if (!logged) {
      Swal.fire({
        icon: "info",
        title: `You need to login first! `,
        showConfirmButton: true,
        confirmButtonText: "Sign Up",
        confirmButtonColor: "green",
      }).then((result) => result.isConfirmed && setShowSignUp(true));
      return;
    }
    const data = JSON.parse(localStorage.getItem("logged"))?.library;
    const gameIndex = data.findIndex((el) => el.id === addedGame.id);
    gameIndex === -1 ? data.push(addedGame) : data.splice(gameIndex, 1);
    const newLogged = { ...logged, library: data };
    UpdateUsers(newLogged);
    setLibraryGames(data);
  }, [addedGame]);

  // reset data to default when clicking logo
  function resetData() {
    if (data?.count < 852000 || data.previous)
      getData().then((d) => setData(d));
    setResetPageToOne(true);
    searchName && setSearchName("");
    currGame && setCurrGame(null);
    showLibrary && setShowLibrary(false);
    showSignUp && setShowSignUp(false);
    showLogin && setShowLogin(false);
    showUser && setShowUser(false);
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
        showLibrary && setShowLibrary(false);
        window.scrollTo(0, 0);
      }
    });
  }

  function handleShowLibrary(show) {
    setShowLibrary(show);
    currGame && setCurrGame(null);
    showSignUp && setShowSignUp(false);
    showUser && setShowUser(false);
  }
  function handleFilter(url) {
    getData(url).then((d) => setData(d));
    setResetPageToOne(true);
  }

  function handleShowSignUp() {
    setShowSignUp(true);
    showLibrary && setShowLibrary(false);
    currGame && setCurrGame(null);
    showLogin && setShowLogin(false);
  }

  function handleLogin(loginUser) {
    localStorage.setItem("logged", JSON.stringify(loginUser));
    setLogged(loginUser);
    setShowLogin(false);
    setShowSignUp(false);
    initialLibraryGames();
    Swal.fire({
      icon: "success",
      title: `Welcome ,${loginUser.name}`,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  function handleSignOut() {
    Swal.fire({
      title: "Signing Out?",
      text: "Are you sure to continue!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("logged", null);
        setLogged(null);
        currGame && setCurrGame(null);
        showLibrary && setShowLibrary(false);
        libraryGames && setLibraryGames(null);
        showUser && setShowUser(false);
      }
    });
  }

  function handleShowUser() {
    setShowUser(true);
    showLibrary && setShowLibrary(false);
    currGame && setCurrGame(null);
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
              showLibrary={showLibrary}
              handleShowSignUp={handleShowSignUp}
              showSignUp={showSignUp}
              logged={logged}
              handleSignOut={handleSignOut}
              handleShowUser={handleShowUser}
            />
            {showLogin ? (
              <Login handleLogin={handleLogin} />
            ) : showSignUp ? (
              <SignUp setShowLogin={setShowLogin} />
            ) : (
              <div className="main">
                <Sidebar resetData={resetData} logged={logged} />
                {showLibrary ? (
                  <Library
                    onClickGame={handleClickGame}
                    libraryGames={libraryGames}
                  />
                ) : showUser ? (
                  <User
                    logged={logged}
                    setLogged={setLogged}
                    UpdateUsers={UpdateUsers}
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
                    handleFilter={handleFilter}
                  />
                )}
              </div>
            )}
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
