import { useEffect, useRef, useState } from "react";

export default function Developers({ developers }) {
  const [devTransform, setDevTransform] = useState(0);
  const [scrollAmount, setScrollAmount] = useState(0);
  const wrapper = useRef();
  const container = useRef();

  function calcScrollLimitOffset() {
    if (window.innerWidth > 1300) return -975;
    if (window.innerWidth > 767) return -645;
    return -315;
  }

  function handleNextCard() {
    const limit = container.current.offsetWidth + calcScrollLimitOffset();
    if (scrollAmount < limit) {
      wrapper.current.scrollLeft = scrollAmount + 330;
      setScrollAmount((t) => t + 330);
    } else {
      wrapper.current.scrollLeft = 0;
      setScrollAmount(0);
    }
  }

  function handlePerviousCard() {
    if (scrollAmount > 0) {
      setScrollAmount((t) => t - 330);
      wrapper.current.scrollLeft = scrollAmount - 330;
    } else {
      setDevTransform(80);
      setTimeout(() => {
        setDevTransform(0);
      }, 100);
    }
  }

  return (
    <div className="devs-container">
      <div className="dev-btns">
        <span className="dev-left-btn" onClick={handlePerviousCard}>
          &#x2190;
        </span>
        <span className="dev-right-btn" onClick={handleNextCard}>
          &#x2192;
        </span>
      </div>
      <div className="developers" ref={wrapper}>
        <div
          ref={container}
          className="dev-wrapper"
          style={{ transform: `translateX(${devTransform}px)` }}
        >
          {developers?.map((dev) => {
            return (
              <div
                key={dev.id}
                className="dev"
                style={{
                  background: ` linear-gradient(0deg, #222 40%, transparent),
      url(${dev.image_background}) center top / cover no-repeat `,
                }}
              >
                <div className="dev-main">
                  <img
                    src={
                      dev.image
                        ? dev.image
                        : `https://i.pravatar.cc/200?u=${dev.id}`
                    }
                  ></img>
                  <h3>{dev.name}</h3>
                  <div className="dev-positions">
                    {dev.positions.map((pos) => (
                      <span key={pos.id}>{pos.name}</span>
                    ))}
                  </div>
                </div>
                <div className="dev-extra">
                  <div className="dev-know-for">
                    <h3>Known for</h3>
                    <span>{dev.games_count}</span>
                  </div>
                  <div className="dev-games">
                    {dev.games.map((g) => (
                      <div key={g.id} className="dev-game">
                        <h4>{g.name}</h4>
                        <span>{g.added}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
