import "./index.css";
import { PriorityBtn, DropDown } from "../../components";

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
          <div>P</div>
          <div>IR</div>
          <div>H</div>
          <div>G</div>
          <div>S</div>
          <div>C</div>
        </div>
      </div>
      <div className="ledgers">
        <p>Here comes the notes</p>
      </div>
    </section>
  );
}
