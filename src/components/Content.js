import { useRef } from "react";
import Filter from "./Filter";
import GamesList from "./GamesList";
import GamesDetails from "./GameDetails";
import Pagination from "./Pagination";

export default function Content({
  data,
  onClickGame,
  currGame,
  searchName,
  handlePagination,
  Apikey,
  setImgOverlay,
  resetPageToOne,
}) {
  // for page pagination
  const currPage = useRef(1);
  if (resetPageToOne) currPage.current = 1;
  // for number of games displayed
  let size = 16;
  if (searchName != "") size = 20;

  return (
    <div className="content">
      {currGame ? (
        <GamesDetails
          setImgOverlay={setImgOverlay}
          game={currGame}
          Apikey={Apikey}
        />
      ) : (
        <>
          {/* <Filter /> */}
          <Pagination
            data={data}
            handlePagination={handlePagination}
            Apikey={Apikey}
            searchName={searchName}
            size={size}
            currPage={currPage}
          />
          <GamesList games={data.results} onClickGame={onClickGame} />
          <Pagination
            data={data}
            handlePagination={handlePagination}
            Apikey={Apikey}
            searchName={searchName}
            size={size}
            currPage={currPage}
          />
        </>
      )}
    </div>
  );
}
