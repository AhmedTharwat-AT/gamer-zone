import { useEffect, useState } from "react";
import GamesList from "./GamesList";

export default function Library({ onClickGame, libraryGames }) {
  return (
    <div className="library-container">
      {libraryGames?.length > 0 ? (
        <div className="library-games">
          <GamesList games={libraryGames} onClickGame={onClickGame} />
        </div>
      ) : (
        <div className="library-empty">
          <h1>Library is Empty</h1>
          <img src="/images/box.png"></img>
          <p>Add game to you library</p>
        </div>
      )}
    </div>
  );
}
