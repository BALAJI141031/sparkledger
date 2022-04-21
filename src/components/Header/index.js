import "./index.css";
function Header() {
  return (
    <div className="header-section">
      <div>
        <span className="span-style">SL</span>
      </div>
      <div className="flex-H-space-around">
        <button>New Note</button>
        <button>Login</button>
        <button>SignUp</button>
      </div>
    </div>
  );
}

export default Header;
