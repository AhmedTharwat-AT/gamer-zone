import { useEffect, useState } from "react";

export default function Filter({ handleFilter, Apikey }) {
  const [platforms, setPlatforms] = useState(null);
  const [genres, setGenres] = useState(null);
  const [showPlatforms, setShowPlatforms] = useState(false);
  const [showGenres, setShowGenres] = useState(false);

  async function fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    fetchData(
      `https://api.rawg.io/api/platforms/lists/parents?key=${Apikey}`
    ).then((data) => setPlatforms(data));
    fetchData(`https://api.rawg.io/api/genres?key=${Apikey}`).then((data) =>
      setGenres(data)
    );
  }, []);

  function handlePlat(e) {
    const clicked = e.target.closest("span")?.getAttribute("idd");
    if (!clicked) return;
    handleFilter(
      `https://rawg.io/api/games?key=${Apikey}&page=1&page_size=16&parent_platforms=${clicked}`
    );
    setShowPlatforms(false);
  }

  function handleGenre(e) {
    const clicked = e.target.closest("span")?.getAttribute("idd");
    if (!clicked) return;
    handleFilter(
      `https://rawg.io/api/games?key=${Apikey}&page=1&page_size=16&genres=${clicked}`
    );
    setShowGenres(false);
  }

  return (
    <div className="filter">
      <div
        onClick={(e) => {
          showGenres && setShowGenres(false);
          !e.target.closest(".close-filter") && setShowPlatforms(true);
        }}
        className={showPlatforms ? "showPlat" : ""}
      >
        <h2>Platforms</h2>
        <span>&#x203A;</span>
        <div className="filter-platforms" onClick={handlePlat}>
          <span
            className="close-filter"
            onClick={() => setShowPlatforms(false)}
          >
            &#x2715;
          </span>
          {platforms?.results.map((el) => (
            <span key={el.id} idd={el.id}>
              {el.name}
            </span>
          ))}
        </div>
      </div>
      <div
        onClick={(e) => {
          showPlatforms && setShowPlatforms(false);
          !e.target.closest(".close-filter") && setShowGenres(true);
        }}
        className={showGenres ? "showGenres" : ""}
      >
        <h2>Genres</h2>
        <span>&#x203A;</span>
        <div className="filter-genres" onClick={handleGenre}>
          <span className="close-filter" onClick={() => setShowGenres(false)}>
            &#x2715;
          </span>
          {genres?.results.map((el) => (
            <span key={el.id} idd={el.id}>
              {el.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
