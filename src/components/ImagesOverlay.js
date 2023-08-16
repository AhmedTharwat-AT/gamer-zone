import { useEffect, useState } from "react";

export default function ImagesOverlay({ imgs, setImgOverlay }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [imgCounter, setImgCounter] = useState(0);

  useEffect(() => {
    setSelectedImg(imgs.results[0].image);
  }, []);

  function handleLeftBtn() {
    if (imgCounter - 1 <= -1) {
      setImgCounter(imgs.results.length - 1);
      setSelectedImg(imgs.results.at(-1).image);
    } else {
      setImgCounter((c) => c - 1);
      setSelectedImg(imgs.results[imgCounter - 1].image);
    }
  }

  function handleRightBtn() {
    if (imgCounter + 1 >= imgs.results.length) {
      setImgCounter(0);
      setSelectedImg(imgs.results[0].image);
    } else {
      setImgCounter((c) => c + 1);
      setSelectedImg(imgs.results[imgCounter + 1].image);
    }
  }

  function handleCloseOverlay(e) {
    const clicked = e.target;
    if (
      clicked.classList.contains("imgs-overlay") ||
      clicked.closest(".close-overlay")
    )
      setImgOverlay(null);
  }

  function handleJumpImg(e) {
    const clicked = e.target;
    if (clicked.localName !== "img") return;
    const imgIndex = imgs.results.findIndex((el) => el.image === clicked.src);
    clicked.scrollIntoView();
    setImgCounter(imgIndex);
    setSelectedImg(imgs.results[imgIndex].image);
  }

  return (
    <div className="imgs-overlay" onClick={handleCloseOverlay}>
      <div className="close-overlay">
        <div>
          <span>&times;</span>
        </div>
      </div>
      <div className="curr-img-wrapper">
        <div className="left-btn img-btn" onClick={handleLeftBtn}>
          <span>&#xab;</span>
        </div>
        <div className="curr-img">
          <img src={selectedImg}></img>
        </div>
        <div className="right-btn img-btn" onClick={handleRightBtn}>
          <span>&#xbb;</span>
        </div>
      </div>
      <div className="all-imgs" onClick={handleJumpImg}>
        {imgs.results.map((el) => (
          <img
            key={el.id}
            src={el.image}
            className={selectedImg == el.image ? "selected-img" : ""}
          ></img>
        ))}
      </div>
    </div>
  );
}
