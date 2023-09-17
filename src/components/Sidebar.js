import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function Sidebar({ resetData, logged }) {
  const sideList = useRef();

  return (
    <div className="sidebar">
      <div ref={sideList} className="side-list ">
        <h1 className="side-home" onClick={resetData}>
          Home
        </h1>
        <div className="side-user">
          <h1>{logged?.name ? `Welcome , ${logged.name}` : "Welcome"}</h1>
          <div className="user-list">
            <h3>Library</h3>
          </div>
        </div>
        <div className="side-user">
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
