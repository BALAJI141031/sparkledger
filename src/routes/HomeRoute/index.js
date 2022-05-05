import "./index.css";
import { HeroSection, LedgerCard } from "../../components";
import { NavLink } from "react-router-dom";
const featuredLedgers = [
  { category: "Polity" },
  { category: "International Relations" },
  { category: "History" },
  { category: "Geography" },
  { category: "Culture" },
];
export default function HomeRoute() {
  return (
    <div>
      <HeroSection />
      <h2 className="text-align-center">Featured Ledgers </h2>
      <div className="featured-ledgers">
        {featuredLedgers.map((ledger) => (
          <NavLink to={`/ledgers/:${ledger.category}`}>
            <LedgerCard category={ledger.category} />
          </NavLink>
        ))}
      </div>
    </div>
  );
}
