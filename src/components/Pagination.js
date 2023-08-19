import { useRef } from "react";

export default function Pagination({
  data,
  handlePagination,
  Apikey,
  searchName,
  size,
  currPage,
}) {
  const allPages = Math.ceil(data.count / size);

  // let currPage = useRef(currPageNumber);
  // if (resetPageToOne) currPage.current = 1;

  function handleNextPage() {
    data.next && handlePagination(data.next);
    data.next && currPage.current++;
  }

  function handlePreviousPage() {
    data.previous && handlePagination(data.previous);
    data.previous && currPage.current--;
  }

  function handleCurrPage(e) {
    if (e.target.localName !== "span") return;
    currPage.current = Number(e.target.innerText);
    handlePagination(
      `https://rawg.io/api/games?key=${Apikey}${
        searchName !== "" ? `&search=${searchName}` : ""
      }&page=${currPage.current}&page_size=${size}`
    );
  }

  return (
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
            <em>....</em>
          </>
        ) : null}
        <span>{currPage.current - 1 <= 0 ? "" : currPage.current - 1} </span>
        <span className="curr-page">{currPage.current} </span>
        <span>
          {currPage.current + 1 > allPages ? "" : currPage.current + 1}
        </span>
        {currPage.current + 1 >= allPages ? (
          ""
        ) : (
          <>
            <em>....</em>
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
  );
}
