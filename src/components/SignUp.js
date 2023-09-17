import { useState } from "react";
import Swal from "sweetalert2";
export default function SignUp({ setShowLogin }) {
  const uniqueId = crypto.randomUUID();
  const [signedUser, setSignedUser] = useState({
    id: uniqueId,
    name: "",
    pass: "",
    img: `https://picsum.photos/seed/${uniqueId}/200/200`,
    library: [],
  });
  const [notValid, setNotValid] = useState(false);

  const popup = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

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
    if (!signedUser.name || !signedUser.pass) {
      setNotValid(true);
      return;
    }
    if (signedUser.name.length < 4) return;
    if (checkUserAlreadyExist()) {
      popup.fire({
        icon: "error",
        title: "User already exist!",
        customClass: { timerProgressBar: "timer-bar-false" },
      });
      return;
    }
    let users = JSON.parse(localStorage.getItem("users"));
    !users && (users = []);
    users.push(signedUser);
    localStorage.setItem("users", JSON.stringify(users));
    setShowLogin(true);
    setNotValid(false);
    popup.fire({
      icon: "success",
      title: "Signed in successfully",
      customClass: { timerProgressBar: "timer-bar-true" },
    });
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
            {notValid && !signedUser.name ? (
              <p>Please enter valid username!</p>
            ) : signedUser.name && signedUser.name.length < 4 ? (
              <p>Username min length is 4 chars!</p>
            ) : (
              <></>
            )}
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
            {notValid && !signedUser.pass && (
              <p>Please enter valid password!</p>
            )}
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
