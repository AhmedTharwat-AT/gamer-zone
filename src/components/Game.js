import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Game({ game }) {
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

  return (
    <div className="game">
      <div className="game-wrapper ">
        <div className="game-media">
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
