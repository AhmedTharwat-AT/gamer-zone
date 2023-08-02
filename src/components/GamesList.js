import Game from "./Game";

export default function GamesList({ games }) {
  return (
    <div className="games-list">
      {games.map((game) => (
        <Game key={game.id} game={game} />
      ))}
    </div>
  );
}
