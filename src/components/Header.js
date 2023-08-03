export default function Header() {
  return (
    <div className="header">
      <ul>
        <li className="logo">G | Z</li>
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
