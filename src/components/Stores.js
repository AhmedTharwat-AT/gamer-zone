import Platforms from "./Platforms";

export default function Stores({ stores }) {
  function handleOpenStorePage(url) {
    window.open(`https://www.${url}`, "_blank");
  }
  return (
    <div className="stores-wrapper">
      {stores.map((el) => (
        <div
          key={el.id}
          className="store"
          onClick={() => handleOpenStorePage(el.store.domain)}
        >
          <h2>{el.store.name}</h2>
          <Platforms plat={el.store.name} size="xl" />
        </div>
      ))}
    </div>
  );
}
