import { useState } from "react";
import { useDifferentNotes } from "../../Contexts";
import "./index.css";
function DeviceNav({ category, activeButton, setActiveButton, title }) {
  const { dispatchDifferentNotes } = useDifferentNotes();
  return (
    <div
      className={activeButton === title ? "style-nav-btn" : ""}
      title={title}
      onClick={() => {
        setActiveButton(title);
        dispatchDifferentNotes({ type: category, payload: true });
      }}
    >
      {category}
    </div>
  );
}

function DesktopNav({ category, activeButton, setActiveButton }) {
  const { dispatchDifferentNotes } = useDifferentNotes();
  console.log("hey i want trash notes categoryyyy",category)
  return (
    <div
      className={
        activeButton === category ? "desktop-nav style-nav-btn" : "desktop-nav"
      }
      id={activeButton === category ? "style-border" : null}
      onClick={() => {
        setActiveButton(category);
        dispatchDifferentNotes({ type: category, payload: true });
      }}
    >
      {category}
    </div>
  );
}

export { DeviceNav, DesktopNav };
