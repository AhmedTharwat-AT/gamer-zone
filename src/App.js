import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
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

import { faN, faMobile, faGlobe } from "@fortawesome/free-solid-svg-icons";
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
  faGlobe
);

function App() {
  const Apikey = process.env.REACT_APP_ApiKey;
  const [data, setData] = useState(null);
  const [showElement, setShowElement] = useState(false);

  async function getData(
    url = `https://rawg.io/api/games?key=${Apikey}&page=1&page_size=16`
  ) {
    const res = await fetch(url);
    const d = await res.json();
    setData(d);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 900) {
        setShowElement(true);
      } else {
        setShowElement(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App">
      {data ? (
        <div className="main-wrapper">
          <div className="container">
            <div className="main">
              <Header />
              {showElement && <Sidebar />}
              <Content data={data} />
            </div>
          </div>
        </div>
      ) : (
        <h2>LOADING</h2>
      )}
    </div>
  );
}

export default App;
