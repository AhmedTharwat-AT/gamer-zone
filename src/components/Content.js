import Filter from "./Filter";
import GamesList from "./GamesList";

export default function Content({ data }) {
  console.log(data.results);
  return (
    <div className="content">
      <Filter />
      <GamesList games={data.results} />
    </div>
  );
}
