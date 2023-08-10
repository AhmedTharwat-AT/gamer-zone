import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function Sidebar() {
  const [sidePosition, setSidePosition] = useState({});
  const sideList = useRef();
  const sideStart = useRef();
  const sideEnd = useRef();
  useEffect(() => {
    const addStickyRatio = sideList.current.offsetHeight - window.innerHeight;

    const observerStart = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log("hey top inter");
        setSidePosition({ position: "sticky", top: -3 });
      }
      if (!entry.isIntersecting) {
        console.log("hey top not inter");
        setSidePosition({
          position: "relative",
          top: sideList.current.offsetTop,
        });
      }
    });
    const observerEnd = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log("hey bot inter");
        setSidePosition({ position: "sticky", top: -addStickyRatio + 10 });
      }
      if (!entry.isIntersecting) {
        console.log("hey bot not inter");
        setSidePosition({
          position: "relative",
          top: sideList.current.offsetTop,
        });
      }
    });

    if (window.innerWidth >= 900) {
      observerStart.observe(sideStart.current);
      observerEnd.observe(sideEnd.current);
    }

    return () => {
      observerStart.unobserve(sideStart.current);
      observerEnd.unobserve(sideEnd.current);
    };
  }, []);
  return (
    <div className="sidebar">
      <div
        ref={sideList}
        className="side-list "
        style={sidePosition ? sidePosition : {}}
      >
        <span className="side-start" ref={sideStart}></span>
        <div className="side-home">HOME</div>
        <div className="side-user">
          <span className="side-end" ref={sideEnd}></span>
          <h1 className="side-head">Ahmed</h1>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
          <div>lasaaaaaaaaaaaaaaaaaaaaaaaat</div>
        </div>
      </div>
    </div>
  );
}
