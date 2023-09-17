export default function User({ logged }) {
  return (
    <div className="user-container">
      <div className="user-main">
        {logged.back ? <img></img> : <div className="temp-back"></div>}
        <div className="user-main-info">
          <img src={logged.img}></img>
          <h2>{logged.name}</h2>
        </div>
      </div>
    </div>
  );
}
