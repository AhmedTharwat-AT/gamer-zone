import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function Sidebar() {
  const sideList = useRef();

  return (
    <div className="sidebar">
      <div ref={sideList} className="side-list ">
        <div className="side-home">HOME</div>
        <div className="side-user">
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
        </div>
      </div>
    </div>
  );
}
