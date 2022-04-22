import "./index.css";
import DropDown from "../DropDown";

// this for hompe page
function LedgerCard() {
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

// created-ledger card

function LedgerNote(props) {
  return (
    <div className="ledger-note">
      <div className="ledger-contnet">
        <h3>Polity note</h3>
        <p>Parliment Zero hour discussions</p>
        <div className="ledger-note-actions-wrapper">
          <i>Created At 21-04-2022</i>
          <div className="ledger-note-actions">
            <DropDown options={["High", "Medium", "Low"]} />
            <DropDown
              options={["Polity", "Geography", "History", "Art&Culture", "IR"]}
              type={"checkbox"}
            />
            <button className="color-picker">
              <svg
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="ColorLensIcon"
              >
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path>
              </svg>
            </button>
            <button className="color-picker">
              <svg
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="EditIcon"
              >
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
              </svg>
            </button>
            <button className="color-picker">
              <svg
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="DeleteIcon"
              >
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="note-proiority-label">HIGH</div>
      <button className="color-picker pin-note">
        <svg
          class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="PushPinIcon"
        >
          <path
            fill-rule="evenodd"
            d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export { LedgerNote, LedgerCard };


