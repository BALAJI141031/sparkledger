import { NavLink } from "react-router-dom";
import { PATHS } from "../../config/constants";
import "./index.css";
function Header() {
  return (
    <div className="header-section">
      <div>
        <span className="span-style">SL</span>
      </div>
      <div className="flex-H-space-around">
        <NavLink to={PATHS.WRITE_LEDGER}>
          <button className="header-primary-cta">New Note</button>
        </NavLink>
        <button className="header-primary-cta">Login</button>
        <button className="header-primary-cta">SignUp</button>
      </div>
    </div>
  );
}

export default Header;
