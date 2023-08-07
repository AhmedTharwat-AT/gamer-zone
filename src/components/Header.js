export default function Header({ setCurrGame }) {
  return (
    <div className="header">
      <ul>
        <li onClick={() => setCurrGame(false)}>
          <h1 className="logo"> G | Z</h1>
        </li>
        <li className="search">
          <input type="text" placeholder="enter game name"></input>
        </li>
        <li className="header-tabs">
          <span className="library">Library 💼</span>
          <span className="welcome-user">Welcome , Ahmed</span>
        </li>
      </ul>
    </div>
  );
}
