import "./index.css";

export default function LedgerCard() {
  return (
    <div className="ledger-card">
      <img
        src="https://i.ytimg.com/vi/5WTa6l_I_os/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCH5GFvAOB0dQzpRQ704grFCiA6Zg"
        className="img-res grid-overlap"
      />
      <div className="grid-overlap ledger-card-desc">
        <h2>International relations Ledger</h2>
        <button className="prime-btn">Explore</button>
      </div>
    </div>
  );
}
