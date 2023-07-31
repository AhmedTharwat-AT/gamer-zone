import { useEffect, useState } from "react";

function App() {
  const Apikey = process.env.REACT_APP_ApiKey;
  const [data, setData] = useState(null);

  async function getData(
    url = `https://rawg.io/api/games?key=${Apikey}&page=1&page_size=10`
  ) {
    const res = await fetch(url);
    const d = await res.json();
    setData(d);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {data && (
        <header className="App-header">
          {data.results.map((game) => {
            return (
              <div key={game.id}>
                <h1>Name : {game.name}</h1>
                <p>Rating : {game.rating}</p>
                <img
                  style={{ width: 100 }}
                  src={game.background_image}
                  alt={game.name}
                />
              </div>
            );
          })}
          {data.next && (
            <button onClick={() => getData(data.next)}>next</button>
          )}
          {data.previous && (
            <button onClick={() => getData(data.previous)}>previous</button>
          )}
          <p>hello from desktop</p>
          <p>Apikey : {Apikey}</p>
        </header>
      )}
    </div>
  );
}

export default App;
