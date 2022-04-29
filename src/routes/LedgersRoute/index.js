import "./index.css";
import {
  PriorityBtn,
  DropDown,
  LedgerNote,
  WriteLedgerNote,
} from "../../components";



export default function LedgersRoute() {
  return (
    <section className="ledgers-section">
      <div className="ledger-section-filters">
        <div className="flex-H-center-V">
          <p>Sort By</p>
          <DropDown options={["New-first", "Old-first"]} />
        </div>
        <div className="flex-H-center-V">
          <p>Priority</p>
          <PriorityBtn />
          <PriorityBtn />
          <PriorityBtn />
        </div>
      </div>
      <div className="nav-container">
        <div className="device-navbar">
          <div title="polity">P</div>

          <div title="Relations">IR</div>

          <div title="History">H</div>

          <div title="Geography">G</div>

          <div title="Society">S</div>

          <div title="Culture">C</div>
        </div>
      </div>
      <div className="ledgers">
        <LedgerNote />
        <LedgerNote />
      </div>
    </section>
  );
}
