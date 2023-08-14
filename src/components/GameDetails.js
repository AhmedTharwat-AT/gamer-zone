import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Platforms from "./Platforms";
import Section from "./Section";
import Stores from "./Stores";

export default function GamesDetails({ game, Apikey }) {
  const [hovered, setHovered] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [screenshots, setScreenshots] = useState(null);
  const reactions = {
    exceptional: "🎯",
    recommended: "👍",
    meh: "😑",
    skip: "👎",
  };

  async function fetchScreenshots() {
    const res = await fetch(
      `https://api.rawg.io/api/games/${game.id}/screenshots?key=${Apikey}`
    );
    const d = await res.json();
    setScreenshots(d);
  }

  useEffect(() => {
    console.log(game);
    fetchScreenshots();
  }, []);

  function displayImages(data) {
    let arr;
    if (data.length > 4) {
      arr = data.slice(0, 5).map((el, i, ar) =>
        i == 4 ? (
          <span>
            <img className="last-img" src={ar[i - 1].image}></img>
          </span>
        ) : (
          <span>
            <img src={el.image}></img>
          </span>
        )
      );
    } else {
      arr = data.map((el) => (
        <span>
          <img src={el.image}></img>
        </span>
      ));
    }
    return arr;
  }

  function calcRateWidth(rate) {
    return (
      game.ratings.reduce((acc, curr) => {
        if (acc) return acc;
        if (curr.title === rate) return curr.percent;
      }, 0) + "%"
    );
  }
  return (
    <div className="details">
      <div className="details-main">
        <div className="-main-left">
          <div className="-left-head">
            <div className="-head-date">
              {new Date(game.released)
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}
            </div>
            <div className="-head-platforms">
              <Platforms plat={game.parent_platforms} />
            </div>
            <div className="-head-playtime">
              Average Playtime : {game.playtime} hours
            </div>
          </div>
          <div className="-left-content">
            <h1>{game.name}</h1>
            <div className="-content-btns">
              <button>
                <span>Add to</span> Library
                <span className="-btns-icon">
                  <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
                </span>
              </button>
              <button>
                <span>Add to</span> Wishlist
                <span className="-btns-icon">
                  <FontAwesomeIcon icon="fa-solid fa-briefcase" />
                </span>
              </button>
            </div>
          </div>
          <div className="-left-rate">
            <div className="-rate-high">
              <div className="-high">
                <div className="-high-title">
                  {game.ratings.length > 0 ? (
                    <>
                      <h1>
                        {
                          game.ratings?.reduce((acc, curr) =>
                            curr.count > acc.count ? curr : acc
                          ).title
                        }{" "}
                      </h1>
                      <span>🎯</span>
                    </>
                  ) : (
                    <h1>There Are No Ratings</h1>
                  )}
                </div>
                <span className="underline-low">
                  {game.ratings.length > 0
                    ? game.ratings?.reduce((acc, curr) => curr.count + acc, 0)
                    : "NO"}{" "}
                  RATINGS
                </span>
              </div>
              <div className="-high top-rate">
                <h1>#1</h1>
                <span className="underline-low">ACTION</span>
              </div>
              <div className="-high top-rate">
                <h1>#1</h1>
                <span className="underline-low">top 2023</span>
              </div>
            </div>
            <div className="-rate-percent">
              <div className="percent-bar">
                {game.ratings.length > 0 &&
                  game.ratings.map((el) => (
                    <div
                      key={el.title}
                      className={`${el.title} ${
                        hovered == el.title ? "hovered" : ""
                      } bar`}
                      style={{
                        width: calcRateWidth(el.title),
                      }}
                      onMouseEnter={() => setHovered(el.title)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <span>{reactions[el.title]}</span>
                    </div>
                  ))}
              </div>
              <div className="percent-bubbles">
                {game.ratings.length > 0 &&
                  game.ratings.map((el) => {
                    return (
                      <div
                        key={el.title}
                        className={`bubble ${
                          hovered == el.title ? "hovered" : ""
                        }`}
                        onMouseEnter={() => setHovered(el.title)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <span className={`${el.title} dot`}></span>
                        <h4>{el.title}</h4>
                        <span className="bubble-count">{el.count}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="-left-about">
            <div className="about-head">
              <h2>About</h2>
              <p>
                {showMore
                  ? game.description_raw
                  : game.description_raw.slice(
                      0,
                      game.description_raw.length / 4
                    ) + "..."}
              </p>
              <span onClick={() => setShowMore((s) => !s)}>
                {showMore ? "Show less" : "Read more"}
              </span>
            </div>
            <div className="about-sections ">
              <div className="about-section">
                <h4>Platforms</h4>
                <div>
                  {game.platforms.map((el, i, arr) => (
                    <span key={el.platform.id} className="underline-high">
                      {i == arr.length - 1
                        ? el.platform.name
                        : el.platform.name + ","}
                    </span>
                  ))}
                </div>
              </div>
              <Section
                classOne=""
                classTwo="metascore"
                title="metascore"
                data={game.metacritic ? game.metacritic : "N-R"}
              />
              <Section
                classOne=""
                classTwo="underline-high"
                title="genre"
                data={game.genres}
              />
              <Section
                classOne=""
                classTwo=""
                title="release date"
                data={new Date(game.released)
                  .toDateString()
                  .split(" ")
                  .slice(1)
                  .join(" ")}
              />
              <Section
                classOne=""
                classTwo="underline-high"
                title="developer"
                data={game.developers}
              />

              <Section
                classOne=""
                classTwo="underline-high"
                title="publisher"
                data={game.publishers}
              />
              <Section
                classOne="about-section-full"
                classTwo="underline-high"
                title="tags"
                data={game.tags}
              />
              <Section
                classOne="about-section-full"
                classTwo="underline-high"
                title="website"
                data={game.website ? game.website : "there are no website"}
              />
            </div>
          </div>
        </div>
        <div className="-main-right">
          <div className="right-media">
            {screenshots && displayImages(screenshots.results)}
          </div>
          <div className="right-stores">
            <h2>Where to buy</h2>
            {<Stores stores={game.stores} />}
          </div>
        </div>
      </div>
    </div>
  );
}
