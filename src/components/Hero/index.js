import "./index.css";
import { GiWindSlap } from "../../icons";
export default function HeroSection() {
  return (
    <main className="hero-section">
      <div className=" hero-texts">
        <h1>
          Spark Wind <GiWindSlap className="hero-icon" />
        </h1>
        <button className="hero-cta">Explore</button>
      </div>
    </main>
  );
}
