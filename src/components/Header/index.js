import "./index.css";
function Header() {
  return (
    <div className="header-section">
      <div>
        <span className="span-style">SL</span>
      </div>
      <div className="flex-H-space-around">
        <button className="header-primary-cta">New Note</button>
        <button className="header-primary-cta">Login</button>
        <button className="header-primary-cta">SignUp</button>
      </div>
    </div>
  );
}

export default Header;
