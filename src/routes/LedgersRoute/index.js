import "./index.css";
import { useState } from "react";
import {
  PriorityBtn,
  DropDown,
  LedgerNote,
  WriteLedgerNote,
} from "../../components";
import { DeviceNav, DesktopNav } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getNotes } from "../../networkCalls";
import { useDifferentNotes } from "../../Contexts";
import { REDUCER_CONSTANTS, PRIORITY, ERROR } from "../../config/constants";
import { Modal } from "../../components";
const navItems = [
  { title: "AllNotes", category: "A" },
  { title: "Polity", category: "P" },
  { title: "IR", category: "IR" },
  { title: "History", category: "H" },
  { title: "Geography", category: "G" },
  { title: "Art&Culture", category: "A" },
  { title: "PinnedNotes", category: "P" },
  { title: "Current Affairs", category: "CA" },
  { title: "trash", category: "T" },
];

const priorityFilters = [PRIORITY.HIGH, PRIORITY.MEDIUM, PRIORITY.LOW];

export default function LedgersRoute() {
  let { category } = useParams();
  const { dispatchDifferentNotes, notes, categoryFilteredNotes } =
    useDifferentNotes();

  if (category.split(":")[1] === "null") category = "AllNotes";
  // this is to add styles for nav items
  let initialBtn;
  switch (category) {
    case "AllNotes":
      initialBtn = "All";
      break;
    default:
      initialBtn = category.split(":")[1];
      break;
  }

  // this is for priority filters

  const [activeButton, setActiveButton] = useState(initialBtn);

  const [modal, setModal] = useState({ status: false, id: null });

  //  network call
  useEffect(() => {
    console.log("yes it is calling after modal");
    (async () => {
      try {
        const response = await getNotes();

        dispatchDifferentNotes({
          type: REDUCER_CONSTANTS.ALL_NOTES_LIST,
          payload: [...response.data.notes],
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }, [modal]);

  return (
    <section className="ledgers-section">
      <div className="ledger-section-filters">
        <div className="filters-div">
          <div className="flex-H-center-V">
            <p>Sort By</p>
            <DropDown options={["Select-sortBy", "New-first", "Old-first"]} />
          </div>
          <div className="flex-H-center-V">
            <p>Priority :</p>
            {priorityFilters.map((proiority) => (
              <PriorityBtn filterType={proiority} />
            ))}
          </div>
        </div>
      </div>
      <div className="nav-container">
        <div className="device-navbar">
          U'R LEDGERS
          {navItems.map((item) => (
            <DeviceNav
              category={item.category}
              title={item.title}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          ))}
        </div>
        <div className="desktop-navbar">
          U'R LEDGERS
          {navItems.map((item) => (
            <DesktopNav
              category={item.title}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          ))}
        </div>
      </div>
      {categoryFilteredNotes.length !== 0 ? (
        <div className="ledgers">
          {categoryFilteredNotes.map((note) => (
            <LedgerNote note={note} setModal={setModal} key={note.id} />
          ))}
        </div>
      ) : (
        <p>{ERROR.NOTES_NOT_FOUND}</p>
      )}
      {modal.status && <Modal setModal={setModal} id={modal.id} />}
    </section>
  );
}
