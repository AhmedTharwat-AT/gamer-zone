import { useRef } from "react";
import Filter from "./Filter";
import GamesList from "./GamesList";
import GamesDetails from "./GameDetails";
import Pagination from "./Pagination";

export default function Content({
  Apikey,
  data,
  onClickGame,
  currGame,
  searchName,
  handlePagination,
  setImgOverlay,
  resetPageToOne,
  showLibrary,
  handleFilter,
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
          onClickGame={onClickGame}
        />
      ) : (
        <>
          <Filter Apikey={Apikey} handleFilter={handleFilter} />
          {/* <Pagination
            data={data}
            handlePagination={handlePagination}
            Apikey={Apikey}
            searchName={searchName}
            size={size}
            currPage={currPage}
          /> */}
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
