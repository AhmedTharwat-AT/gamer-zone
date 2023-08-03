import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { func } from "prop-types";
import { useEffect, useState } from "react";

export default function Game({ game }) {
  const [hoverElement, setHoverElement] = useState({
    height: null,
    hovered: false,
  });
  const [gameVideo, setGameVideo] = useState(null);

  function displayPlatforms() {
    let extra = 0;
    const arr = game.parent_platforms.map((p, i, a) => {
      let platform = (p.platform.name + "").split(" ")[0].toLowerCase();
      let str = `fa-brands fa-${platform}`;
      if (platform == "pc") str = `fa-brands fa-windows`;
      if (platform == "ios") str = `fa-icons fa-mobile`;
      if (platform == "web") str = `fa-icons fa-globe`;
      if (platform == "nintendo") str = `fa-icons fa-n`;

      return (
        <span key={str}>
          <FontAwesomeIcon icon={str} size="sm" />
        </span>
      );
    });

    return arr;
  }

  async function fetchVideo() {
    const res = await fetch(
      `https://api.rawg.io/api/games/3498/movies?key=${process.env.REACT_APP_ApiKey}`
    );
    const data = await res.json();
    const rand = Math.round(Math.random() * 8);
    setGameVideo(data.results[rand].data?.["480"]);
  }

  function playVideo(video) {
    gameVideo || fetchVideo();
    video.play();
  }

  function handleHoverGame(e) {
    const gameElement = e.target.closest(".game");
    const videoElement = gameElement.querySelector(".game-video");
    const height = gameElement.children[0].offsetHeight;
    setHoverElement({ height, hovered: true });
    playVideo(videoElement);
  }

  function handleUnHoverGame(e) {
    const gameElement = e.target.closest(".game");
    const videoElement = gameElement.querySelector(".game-video");
    videoElement.currentTime = 0;
    !videoElement.paused && videoElement.pause();
    setHoverElement({ height: null, hovered: false });
  }

  return (
    <div
      className={`game ${hoverElement.hovered && "selected"}`}
      style={{ height: hoverElement.height }}
      onMouseEnter={handleHoverGame}
      onMouseLeave={handleUnHoverGame}
    >
      <div className="game-wrapper">
        <div className="game-media">
          {hoverElement.hovered &&
            (gameVideo == null || <div className="spinner"></div>)}
          <video className={`game-video`} src={gameVideo} muted loop></video>
          <img src={game.background_image} alt={game.name} />
        </div>
        <div className="game-info">
          <div className="platforms">{displayPlatforms()}</div>
          <h1>Name : {game.name}</h1>
          <button className="add-fav-btn">+ {game.added}</button>
          <div className="info-hidden-wrapper">
            <div className="game-info-hidden">
              <div>
                <span>Rating :</span>
                <span>{game.rating}</span>
              </div>
              <div>
                <span>Release Date :</span>
                <span>{game.released}</span>
              </div>
              <div>
                <span>Genres :</span>
                <span>
                  {game.genres.map((gen, i, arr) =>
                    i < arr.length - 1 ? gen.name + " , " : gen.name
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
