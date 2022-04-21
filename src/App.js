import "./App.css";
import { Header, HeroSection, LedgerCard } from "./components";
const featuredLedgers = [1, 2, 3];
function App() {
  return (
    <div className="App">
      <Header />
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

export default App;
