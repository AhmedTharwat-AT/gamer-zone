import { useEffect, useRef, useState } from "react";
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
import Footer from "./components/Footer";
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
  const parent = useRef();

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

  return (
    <div className="App" ref={parent}>
      {data ? (
        <div className="main-wrapper">
          <div className="container">
            <Header />
            <div className="main">
              <Sidebar />
              <Content data={data} />
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
