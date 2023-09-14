import { useState } from "react";
export default function Login({ handleLogin }) {
  const [loginUser, setLoginUser] = useState({ name: "", pass: "" });

  function checkUserExist() {
    const users = JSON.parse(localStorage.getItem("users"));
    if (!users || users.length == 0) return false;
    const check = users.map((el) => {
      if (el.name === loginUser.name && el.pass === loginUser.pass) return true;
    });
    return check.includes(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!loginUser.name && !loginUser.pass) return;
    if (checkUserExist()) {
      handleLogin(loginUser);
    }
  }

  return (
    <div className="sign-up">
      <div className="sign-wrapper">
        <form className="sign-form">
          <h1>login</h1>
          <div className="sign-input">
            <label>Username</label>
            <input
              type="text"
              onChange={(e) =>
                setLoginUser({ ...loginUser, name: e.target.value })
              }
              value={loginUser.name}
            ></input>
          </div>
          <div className="sign-input">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) =>
                setLoginUser({ ...loginUser, pass: e.target.value })
              }
              value={loginUser.pass}
            ></input>
          </div>
          <span></span>
          <button type="submit" className="sign-btn" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
