import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Platforms from "./Platforms";

export default function GamesDetails({ game }) {
  console.log(game);
  return (
    <div className="details">
      <div className="details-main">
        <div className="-main-top">
          <div className="-top-date">
            {new Date(game.released)
              .toDateString()
              .split(" ")
              .slice(1)
              .join(" ")}
          </div>
          <div className="-top-platforms">
            <Platforms plat={game.parent_platforms} />
          </div>
          <div className="-top-playtime">
            Average Playtime : {game.playtime} hours
          </div>
        </div>
        <div className="-main-content">
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
      </div>
    </div>
  );
}
