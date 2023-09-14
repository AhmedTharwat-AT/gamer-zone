import { useState } from "react";
export default function SignUp({ setShowLogin }) {
  const [signedUser, setSignedUser] = useState({ name: "", pass: "" });

  function checkUserAlreadyExist() {
    const users = JSON.parse(localStorage.getItem("users"));
    if (!users || users.length == 0) return false;
    const check = users.map((el) => {
      if (el.name === signedUser.name) return true;
    });
    return check.includes(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!signedUser.name && !signedUser.pass) return;
    if (checkUserAlreadyExist()) return;
    let users = JSON.parse(localStorage.getItem("users"));
    !users && (users = []);
    users.push(signedUser);
    localStorage.setItem("users", JSON.stringify(users));
    setShowLogin(true);
  }

  return (
    <div className="sign-up">
      <div className="sign-wrapper">
        <form className="sign-form">
          <h1>Sign up</h1>
          <div className="sign-input">
            <label>Username</label>
            <input
              type="text"
              onChange={(e) =>
                setSignedUser({ ...signedUser, name: e.target.value })
              }
              value={signedUser.name}
            ></input>
          </div>
          <div className="sign-input">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) =>
                setSignedUser({ ...signedUser, pass: e.target.value })
              }
              value={signedUser.pass}
            ></input>
          </div>
          <div>
            <label>Already have an account ? </label>{" "}
            <span onClick={() => setShowLogin(true)}>Login</span>
          </div>
          <button type="submit" className="sign-btn" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
