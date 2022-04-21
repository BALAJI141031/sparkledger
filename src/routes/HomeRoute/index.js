import "./index.css";
import { HeroSection, LedgerCard } from "../../components";
const featuredLedgers = [1, 2, 3];
export default function HomeRoute() {
  return (
    <div>
      <HeroSection />
      <h2>Featured Ledgers </h2>
      <div className="featured-ledgers">
        {featuredLedgers.map((ledger) => (
          <LedgerCard />
        ))}
      </div>
    </div>
  );
}
