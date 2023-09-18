import { useState } from "react";
import Swal from "sweetalert2";

export default function User({ logged, setLogged, UpdateUsers }) {
  const [showCoverUrl, setCoverUrl] = useState(false);

  async function handleChangeCover() {
    const { value: url } = await Swal.fire({
      title: "Enter cover image url",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Please enter image url!";
        }
      },
    });

    if (url) {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          icon: "success",
          title: "cover changed successfully",
        });
        setLogged({ ...logged, cover: url });
        UpdateUsers({ ...logged, cover: url });
      };

      img.onerror = () => {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          icon: "error",
          title: "invalid cover url!",
        });
      };
    }
  }

  return (
    <div className="user-container">
      <div className="user-main">
        <span
          className="cover-btn"
          title="Change Cover"
          onClick={handleChangeCover}
        >
          &#x270E;
        </span>
        {logged.cover ? (
          <img className="user-cover" src={logged.cover}></img>
        ) : (
          <div className="temp-cover"></div>
        )}
        <div className="user-main-info">
          <img src={logged.img}></img>
          <h2>{logged.name}</h2>
        </div>
      </div>
    </div>
  );
}
