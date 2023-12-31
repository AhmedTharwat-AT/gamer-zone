import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { func } from "prop-types";
import { useEffect, useRef, useState } from "react";
import Platforms from "./Platforms";

export default function Game({ game, onClickGame, libraryGames = null }) {
  const [hoverElement, setHoverElement] = useState({
    height: null,
    hovered: false,
  });
  const [gameVideo, setGameVideo] = useState(null);
  const videoEl = useRef();

  // check if game is in library
  let isAddedToLibrary = JSON.parse(
    localStorage.getItem("logged")
  )?.library?.find((el) => el.id == game.id);

  async function fetchVideo(video) {
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games/3498/movies?key=${process.env.REACT_APP_ApiKey}`
      );
      const data = await res.json();
      const rand = Math.round(Math.random() * 8);
      setGameVideo(data?.results[rand].data?.["480"]);
    } catch (e) {
      console.error("dont swap quickly", e.message);
    }
  }

  function playVideo(video) {
    if (!gameVideo) {
      fetchVideo(video);
    }
    video.paused && video.play().catch((err) => console.error(err.message));
  }

  function handleHoverGame(e) {
    const gameElement = e.target.closest(".game");
    const height = gameElement.children[0].offsetHeight;
    !hoverElement.hovered && setHoverElement({ height, hovered: true });
    game.background_image && playVideo(videoEl.current);
  }

  function handleUnHoverGame() {
    setHoverElement({ height: null, hovered: false });
    if (!game.background_image) return;
    videoEl.current.currentTime !== 0 && videoEl.current.pause();
    videoEl.current.currentTime = 0;
  }

  function handleClickGame(e) {
    const clicked = e.target;
    if (clicked.closest(".add-fav-btn")) {
      //add game to library
      onClickGame(game.id, true);
    } else {
      //go to game details page
      onClickGame(game.id);
    }
  }

  return (
    <div
      className={`game ${hoverElement.hovered ? "selected" : ""}`}
      style={{ height: hoverElement.height }}
      onMouseEnter={handleHoverGame}
      onMouseLeave={handleUnHoverGame}
      onClick={(e) => {
        handleUnHoverGame();
        handleClickGame(e);
      }}
    >
      <div className="game-wrapper">
        <div className="game-media">
          {game.background_image && (
            <>
              {hoverElement.hovered &&
                (!gameVideo ? <div className="spinner"></div> : null)}
              <video
                className={`game-video`}
                ref={videoEl}
                src={gameVideo}
                muted
                loop
              ></video>
            </>
          )}
          <img src={game.background_image} alt={game.name} />
        </div>
        <div className="game-info">
          <div className="game-info-head">
            <div className="platforms">
              <Platforms plat={game.parent_platforms} />
            </div>
            <span className="metascore">
              {game.metacritic ? game.metacritic : "N-R"}
            </span>
          </div>
          <h1> {game.name}</h1>
          <button className={`add-fav-btn ${isAddedToLibrary ? "added" : ""}`}>
            {isAddedToLibrary ? game.added + 1 : "+" + game.added}
          </button>
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
