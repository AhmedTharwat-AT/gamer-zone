export default function Developers({ dev }) {
  return (
    <div
      className="dev"
      style={{
        background: ` linear-gradient(0deg, #222 40%, transparent),
      url(${dev.image_background}) center top / cover no-repeat `,
      }}
    >
      <div className="dev-main">
        <img
          src={dev.image ? dev.image : `https://i.pravatar.cc/200?u=${dev.id}`}
        ></img>
        <h3>{dev.name}</h3>
        <div className="dev-positions">
          {dev.positions.map((pos) => (
            <span key={pos.id}>{pos.name}</span>
          ))}
        </div>
      </div>
      <div className="dev-extra">
        <div className="dev-know-for">
          <h3>Known for</h3>
          <span>{dev.games_count}</span>
        </div>
        <div className="dev-games">
          {dev.games.map((g) => (
            <div key={g.id} className="dev-game">
              <h4>{g.name}</h4>
              <span>{g.added}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
