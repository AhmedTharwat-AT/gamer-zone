import { useRef, useState } from "react";
import Filter from "./Filter";
import GamesList from "./GamesList";
import GamesDetails from "./GameDetails";

export default function Content({
  data,
  onClickGame,
  currGame,
  getData,
  Apikey,
}) {
  const allPages = Math.ceil(data.count / 16);
  let currPage = useRef(1);

  function handleNextPage() {
    data.next && getData(data.next);
    data.next && currPage.current++;
  }
  function handlePreviousPage() {
    data.previous && getData(data.previous);
    data.previous && currPage.current--;
  }

  function handleCurrPage(e) {
    if (e.target.localName !== "span") return;
    currPage.current = Number(e.target.innerText);
    getData(
      `https://rawg.io/api/games?key=${Apikey}&page=${currPage.current}&page_size=16`
    );
  }

  return (
    <div className="content">
      {currGame ? (
        <GamesDetails game={currGame} />
      ) : (
        <>
          <Filter />
          <GamesList games={data.results} onClickGame={onClickGame} />
          <div className="page-btns">
            <button
              className={`btn previous ${data.previous ? "" : "disabled"}`}
              onClick={handlePreviousPage}
            >
              Previous
            </button>
            <div className="page-num" onClick={handleCurrPage}>
              {currPage.current >= 4 ? (
                <>
                  <span>1</span>
                  <em> .... </em>
                </>
              ) : null}
              <span>
                {currPage.current - 1 <= 0 ? "" : currPage.current - 1}{" "}
              </span>
              <span className="curr-page">{currPage.current} </span>
              <span>
                {currPage.current + 1 > allPages ? "" : currPage.current + 1}
              </span>
              {currPage.current + 1 >= allPages ? (
                ""
              ) : (
                <>
                  <em> .... </em>
                  <span>{allPages}</span>
                </>
              )}
            </div>
            <button
              className={`btn next ${data.next ? "" : "disabled"}`}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
