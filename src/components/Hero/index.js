import "./index.css";
import { GiWindSlap } from "../../icons";
import { NavLink } from "react-router-dom";
import { PATHS } from "../../config/constants";
export default function HeroSection() {
  return (
    <main className="hero-section">
      <div className=" hero-texts">
        <h1>
          Spark Wind <GiWindSlap className="hero-icon" />
        </h1>
        <NavLink to={`/ledgers/AllNotes`}>
          <button className="hero-cta">Explore</button>
        </NavLink>
      </div>
    </main>
  );
}
