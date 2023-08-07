import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Footer from "./components/Footer";
import GamesDetails from "./components/GameDetails";
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
  faPlusCircle
);

function App() {
  const Apikey = process.env.REACT_APP_ApiKey;
  const [data, setData] = useState(null);
  const [currGame, setCurrGame] = useState(null);
  const currImg = useRef();

  async function getData(
    url = `https://rawg.io/api/games?key=${Apikey}&page=1&page_size=16`
  ) {
    const res = await fetch(url);
    const d = await res.json();
    return d;
  }

  useEffect(() => {
    getData().then((d) => setData(d));
  }, []);

  function handleClickGame(gId) {
    getData(`https://rawg.io/api/games/${gId}?key=${Apikey}`).then((d) =>
      setCurrGame(d)
    );
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
          <div className="container">
            <Header setCurrGame={setCurrGame} />
            <div className="main">
              <Sidebar />
              <Content
                data={data}
                getData={getData}
                currGame={currGame}
                onClickGame={handleClickGame}
                Apikey={Apikey}
              />
            </div>
            <Footer />
          </div>
        </div>
      ) : (
        <h2>LOADING</h2>
      )}
    </div>
  );
}

export default App;
