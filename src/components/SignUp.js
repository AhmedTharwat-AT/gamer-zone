export default function SignUp() {
  return (
    <div className="sign-up">
      <div className="sign-wrapper">
        <form className="sign-form">
          <h1>Sign up</h1>
          <div className="sign-input">
            <label>Username</label>
            <input type="text"></input>
          </div>
          <div className="sign-input">
            <label>Password</label>
            <input type="password"></input>
          </div>
          <div>
            <label>Already have an account ? </label> <span>Login</span>
          </div>
          <button className="sign-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
