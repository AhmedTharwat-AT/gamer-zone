import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Platforms from "./Platforms";
import { useState } from "react";

export default function GamesDetails({ game }) {
  const [hovered, setHovered] = useState(null);
  const [showMore, setShowMore] = useState(false);
  console.log(game);
  const reactions = {
    exceptional: "🎯",
    recommended: "👍",
    meh: "😑",
    skip: "👎",
  };

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
                  <h1>
                    {
                      game.ratings.reduce((acc, curr) =>
                        curr.count > acc.count ? curr : acc
                      ).title
                    }{" "}
                  </h1>
                  <span>🎯</span>
                </div>
                <span className="underline-low">
                  {game.ratings.reduce((acc, curr) => curr.count + acc, 0)}{" "}
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
                {game.ratings.map((el) => (
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
                {game.ratings.map((el) => {
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
              <div className="about-section">
                <h4>metascore</h4>
                <div>
                  <span className="metascore">{game.metacritic}</span>
                </div>
              </div>
              <div className="about-section">
                <h4>genre</h4>
                <div className="">
                  {game.genres?.map((el, i, arr) => (
                    <span className="underline-high" key={el.id}>
                      {i == arr.length - 1 ? el.name : el.name + ","}
                    </span>
                  ))}
                </div>
              </div>
              <div className="about-section">
                <h4>release date</h4>
                <div className="">
                  {new Date(game.released)
                    .toDateString()
                    .split(" ")
                    .slice(1)
                    .join(" ")}
                </div>
              </div>
              <div className="about-section">
                <h4>developer</h4>
                <div className="">
                  {game.developers?.map((el, i, arr) => (
                    <span className="underline-high" key={el.id}>
                      {i == arr.length - 1 ? el.name : el.name + ","}
                    </span>
                  ))}
                </div>
              </div>
              <div className="about-section">
                <h4>publisher</h4>
                <div className="">
                  {game.publishers?.map((el) => (
                    <span className="underline-high" key={el.id}>
                      {el.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="about-section about-section-full">
                <h4>tags</h4>
                <div className="">
                  {game.tags?.map((el, i, arr) => (
                    <span className="underline-high" key={el.id}>
                      {i == arr.length - 1 ? el.name : el.name + ","}
                    </span>
                  ))}
                </div>
              </div>
              <div className=" about-section about-section-full">
                <h4>website</h4>
                <div className="">
                  <span className="underline-high">{game.website}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="-main-right"></div>
      </div>
    </div>
  );
}
