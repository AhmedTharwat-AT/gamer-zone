import { useState } from "react";
import Game from "./Game";

export default function GamesList({ games, onClickGame }) {
  return (
    <div className="games-list">
      {games.map((game) => (
        <Game key={game.id} game={game} onClickGame={onClickGame} />
      ))}
    </div>
  );
}
