import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Platforms({ plat, size = "sm" }) {
  let data;
  function checkPlatName(nam) {
    let str = "";
    if (nam == "pc") return (str = `fa-brands fa-windows`);
    if (nam == "ios") return (str = `fa-icons fa-mobile`);
    if (nam == "app") return (str = `fa-icons fa-mobile`);
    if (nam == "web") return (str = `fa-icons fa-globe`);
    if (nam == "nintendo") return (str = `fa-icons fa-n`);
    if (nam == "epic") return (str = `fa-solid fa-gamepad`);
    return nam;
  }

  function verifyPlatType(platform) {
    let str = "";
    if (platform === checkPlatName(platform)) {
      str = `fa-brands fa-${platform}`;
    } else {
      str = checkPlatName(platform);
    }
    return str;
  }

  if (Array.isArray(plat)) {
    data = plat.map((p, i, a) => {
      let platform = (p.platform.name + "").split(" ")[0].toLowerCase();
      let str = verifyPlatType(platform);

      return (
        <span key={str}>
          <FontAwesomeIcon icon={str} size={size} />
        </span>
      );
    });
  } else {
    let platform = (plat + "").split(" ")[0].toLowerCase();
    let str = verifyPlatType(platform);
    data = (
      <span key={str}>
        <FontAwesomeIcon icon={str} size={size} />
      </span>
    );
  }

  return data;
}
