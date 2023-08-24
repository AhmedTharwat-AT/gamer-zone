import { useEffect, useState } from "react";
import GamesList from "./GamesList";

export default function Library({ onClickGame, libraryGames }) {
  return (
    <div className="library-container">
      {libraryGames?.length > 0 ? (
        <>
          <h1 className="library-title">Library Games</h1>
          <div className="library-games">
            <GamesList games={libraryGames} onClickGame={onClickGame} />
          </div>
        </>
      ) : (
        <div className="library-empty">
          <h1 className="library-title">Library is Empty</h1>
          <div>
            <img src="/images/box.png"></img>
            <div>
              Image by{" "}
              <a href="https://www.freepik.com/free-vector/cardboard-boxes-collection-shipment_2005023.htm#page=4&query=empty%20box&position=33&from_view=search&track=ais">
                Freepik
              </a>
            </div>
          </div>
          <p>Add games to your library</p>
        </div>
      )}
    </div>
  );
}
