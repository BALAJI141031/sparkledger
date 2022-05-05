import { BiShow } from "../../icons";
import "./index.css";
function LoginRoute() {
  return (
    <div className="flex-H-center-H">
      <img src="../../assets/hero.png" />
      <div className="auth-form">
        <h2 className="text-align-center">Login</h2>
        <div>
          <label>Email</label>
          <input />
        </div>
        <div>
          <label>Password</label>
          <div className="rel-pos">
            <input type="password" />
            <BiShow className="input-icon" />
          </div>
        </div>
        <button className="btn primary-icon-btn" id="cta">
          Login
        </button>
        <button className="btn primary-icon-btn" id="cta">
          Bot
        </button>
      </div>
    </div>
  );
}

function SignupRoute() {
  return (
    <div className="flex-H-center-H">
      <form className="auth-form">
        <h2 className="text-align-center">Login</h2>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <label>full Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <div>
          <label>confirm password</label>
          <input type="password" />
        </div>
        <button className="btn primary-icon-btn" id="cta">
          sign up
        </button>
        <small>
          Have an account <strong>Login</strong>
        </small>
      </form>
    </div>
  );
}

export { LoginRoute, SignupRoute };
