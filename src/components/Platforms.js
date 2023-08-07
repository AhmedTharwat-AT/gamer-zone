import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Platforms({ plat }) {
  const arr = plat.map((p, i, a) => {
    let platform = (p.platform.name + "").split(" ")[0].toLowerCase();
    let str = `fa-brands fa-${platform}`;
    if (platform == "pc") str = `fa-brands fa-windows`;
    if (platform == "ios") str = `fa-icons fa-mobile`;
    if (platform == "web") str = `fa-icons fa-globe`;
    if (platform == "nintendo") str = `fa-icons fa-n`;

    return (
      <span key={str}>
        <FontAwesomeIcon icon={str} size="sm" />
      </span>
    );
  });

  return arr;
}
