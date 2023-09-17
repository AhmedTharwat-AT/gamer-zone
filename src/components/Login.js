import { useState } from "react";
import Swal from "sweetalert2";
export default function Login({ handleLogin }) {
  const [loginUser, setLoginUser] = useState({ name: "", pass: "" });
  const [notValid, setNotValid] = useState(false);

  const popup = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

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
    if (!loginUser.name || !loginUser.pass) {
      setNotValid(true);
      return;
    }
    if (checkUserExist()) {
      handleLogin(
        JSON.parse(localStorage.getItem("users")).find(
          (el) => el.name === loginUser.name
        )
      );
      setNotValid(false);
    } else {
      // account not found , wrong name or pass
      popup.fire({
        icon: "error",
        title: "Account not found!",
        customClass: { timerProgressBar: "timer-bar-false" },
      });
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
            {notValid && !loginUser.name && <p>Please enter valid username!</p>}
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
            {notValid && !loginUser.pass && <p>Please enter valid password!</p>}
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
