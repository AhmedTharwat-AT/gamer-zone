function App() {
  console.log(process.env.REACT_APP_ApiKey);
  const Apikey = process.env.REACT_APP_ApiKey;
  return (
    <div className="App">
      <header className="App-header">
        <p>hello from desktop</p>
        <p>{process.env.REACT_APP_ApiKey}</p>
      </header>
    </div>
  );
}

export default App;
