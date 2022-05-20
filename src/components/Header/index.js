import { NavLink, useNavigate } from "react-router-dom";
import { PATHS } from "../../config/constants";
import "./index.css";
import { useAuthProvider } from "../../Contexts";
import Cookies from "js-cookie";
function Header() {
  const { isLoggedIn, setLogin } = useAuthProvider();
  const navigate = useNavigate();
  const authHandler = () => {
    if (isLoggedIn) {
      console.log("if block");
      Cookies.remove("jwt_token");
      setLogin(false);
      navigate(PATHS.HOME);
    } else {
      console.log("else block");
      navigate(PATHS.LOGIN);
    }
  };

  return (
    <div className="header-section">
      <NavLink to={PATHS.HOME}>
        <div>
          <span className="span-style">SL</span>
        </div>
      </NavLink>
      <div className="flex-H-space-around">
        <NavLink to={PATHS.WRITE_LEDGER}>
          <button className="header-primary-cta">New Note</button>
        </NavLink>

        <button className="header-primary-cta" onClick={authHandler}>
          {!isLoggedIn ? "Login" : "Logout"}
        </button>

        {!isLoggedIn && (
          <NavLink to={PATHS.SIGNUP}>
            <button className="header-primary-cta">SignUp</button>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Header;
