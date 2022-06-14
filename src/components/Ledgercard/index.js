import "./index.css";
import DropDown from "../DropDown";
import { createNote, editNote } from "../../networkCalls";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { ChangeTheme } from "../../components";
import { useState, useEffect } from "react";
import { useWriteNote } from "../../Contexts";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDifferentNotes } from "../../Contexts/index";
import { useNotifyUser } from "../../Contexts";
import parse from "html-react-parser";

const {
  REDUCER_CONSTANTS,
  PRIORITY,
  NOTE_COLOR,
} = require("../../config/constants");

const noteColors = [
  NOTE_COLOR.ORANGE_SHADE,
  NOTE_COLOR.RED_SHADE,
  NOTE_COLOR.BLUE_SHADE,
];

// this for hompe page
function LedgerCard({ category }) {
  return (
    <div className="ledger-card">
      <img
        src="https://i.ytimg.com/vi/VNZ0so0LCoM/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD1mY7Fw3LKiT-41tzjZi4sYcOaCw"
        className="img-res grid-overlap"
      />
      <div className="grid-overlap ledger-card-desc">
        <h2>{category} Ledger</h2>
        <button className="hero-cta">Explore</button>
      </div>
    </div>
  );
}

// saved-ledger card
function LedgerNote(props) {
  const { note, setModal } = props;
  let {
    title,
    pinStatus,
    category,
    level,
    text,
    createdDate,
    _id: id,
    noteColor,
  } = note;
  const [showThemes, setShowThemes] = useState(false);
  const { dispatchDifferentNotes } = useDifferentNotes();
  const { toast } = useNotifyUser();
  const { notes } = useDifferentNotes();
  const {trash}=notes

  const trashHandler = async (id) => {
    try {
      toast.warning("Moved to Trash", {
        autoClose: 1000,
      });
      let payload = { note: { [REDUCER_CONSTANTS.TRASHED_NOTES]: true } };
      const editResponse = await editNote(id, payload);
      dispatchDifferentNotes({
        type: REDUCER_CONSTANTS.ALL_NOTES_LIST,
        payload: editResponse.data.notes,
      });
      dispatchDifferentNotes({
        type: category,
        payload: true,
      });
    } catch (e) {
      toast.error("Unexpected Error");
    }
  };

  const handlePin = async (id) => {
    try {
      let pinMsg = pinStatus ? "Unpinned" : "Pinned";
      toast.warning(`${pinMsg}${category} note`, {
        autoClose: 1000,
      });
      let payload = {
        note: { [REDUCER_CONSTANTS.WRITE_NOTE_PIN_STATUS]: !pinStatus },
      };
      const editResponse = await editNote(id, payload);
      dispatchDifferentNotes({
        type: REDUCER_CONSTANTS.ALL_NOTES_LIST,
        payload: editResponse.data.notes,
      });
      dispatchDifferentNotes({
        type: category,
        payload: true,
      });
    } catch (e) {
      toast.error("Unexpected Error,");
    }
  };
  return (
    <div className="ledger-note" style={{ backgroundColor: noteColor }}>
      <div className="ledger-contnet">
        <h3>{title}</h3>
        {parse(text)}
        <div className="ledger-note-actions-wrapper">
          <i>Created At {createdDate}</i>
          {!trash && <div className="ledger-note-actions">
            <DropDown
              options={[
                "Level...",
                PRIORITY.HIGH,
                PRIORITY.MEDIUM,
                PRIORITY.LOW,
              ]}
              id={id}
              category={category}
            />
            <DropDown
              options={[
                "Select Category",
                REDUCER_CONSTANTS.POLITY_NOTES,
                REDUCER_CONSTANTS.GEOGRAPHY_NOTES,
                REDUCER_CONSTANTS.HISTORY_NOTES,
                REDUCER_CONSTANTS.IR_NOTES,
                REDUCER_CONSTANTS.ART_AND_CULTURE,
                REDUCER_CONSTANTS.ALL_NOTES,
                REDUCER_CONSTANTS.CURRENT_AFFAIRS_NOTES,
              ]}
              id={id}
              category={category}
            />
            <div
              className="color-editor-icon"
              onMouseEnter={() => setShowThemes(true)}
              onMouseLeave={() => setShowThemes(false)}
            >
              <button className="color-picker">
                <svg
                  class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="ColorLensIcon"
                >
                  <path
                    className="saved-note-tool"
                    d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
                  ></path>
                </svg>
              </button>

              {showThemes && (
                <div className="colors-wrapper">
                  {noteColors.map((color) => (
                    <ChangeTheme
                      color={color}
                      key={color}
                      id={id}
                      category={category}
                    />
                  ))}
                </div>
              )}
            </div>
            <button
              className="color-picker"
              onClick={() => setModal({ status: true, id })}
            >
              <svg
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="EditIcon"
              >
                <path
                  className="saved-note-tool"
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                ></path>
              </svg>
            </button>
            <button className="color-picker" onClick={() => trashHandler(id)}>
              <svg
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="DeleteIcon"
              >
                <path
                  className="saved-note-tool"
                  d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                ></path>
              </svg>
            </button>
          </div> }
        </div>
      </div>
      <div className="label-section">
        <div className="labels">
          <div className="note-proiority-label">{level ?? "Low"}</div>
          {category && <div className="note-proiority-label">{category}</div>}
        </div>
        {!trash && <button className="color-picker pin-note" onClick={() => handlePin(id)}>
          {pinStatus ? (
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
          ) : (
            <svg
              class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="PushPinOutlinedIcon"
              className="tool"
            >
              <path d="M14 4v5c0 1.12.37 2.16 1 3H9c.65-.86 1-1.9 1-3V4h4m3-2H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3V4h1c.55 0 1-.45 1-1s-.45-1-1-1z"></path>
            </svg>
          )}
        </button>}
      </div>
    </div>
  );
}

function WriteLedgerNote() {
  const navigate = useNavigate();
  const { toast } = useNotifyUser();
  const {
    proiorityBtn,
    setProirityBtn,
    dispatchDifferentNotes,
    setActiveButton,
  } = useDifferentNotes();
  const modules = {
    toolbar: [
      [{ header: [3, 4, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  const { quill, quillRef } = useQuill({ modules });

  const { note, dispatchNote } = useWriteNote();
  let { category, level, pinStatus, text, title } = note;
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        dispatchNote({
          type: REDUCER_CONSTANTS.WRITE_NOTE_TEXT,
          payload: quillRef.current.firstChild.innerHTML,
        }); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  // handler to add notes

  const createNoteHandler = async () => {
    try {
      if (title === null) throw "Title can't be empty";
      if (text === null) throw "Note Can't be empty";
      if (category === null) {
        // category = REDUCER_CONSTANTS.ALL_NOTES;
        category = "AllNotes";
      }
      const response = await createNote({
        note: {
          [REDUCER_CONSTANTS.WRITE_NOTE_lEVEL]: level ?? PRIORITY.LOW,
          [REDUCER_CONSTANTS.WRITE_NOTE_TITLE]: title,
          [REDUCER_CONSTANTS.WRITE_NOTE_PIN_STATUS]: pinStatus,
          [REDUCER_CONSTANTS.WRITE_NOTE_CATEGORY]: category,
          [REDUCER_CONSTANTS.WRITE_NOTE_TEXT]: text,
          [REDUCER_CONSTANTS.TRASHED_NOTES]: false,
          noteColor: NOTE_COLOR.DEFAULT_SHADE,
          createdDate: new Date(),
          dateToComapre: Date.now(),
          id: uuidv4(),
        },
      });

      await dispatchDifferentNotes({ type: category, payload: true });

      toast.success(
        `Sucessfully ${
          category === "AllNotes" ? "Random" : category
        } Note created `,
        {
          autoClose: 1200,
        }
      );
      setProirityBtn(proiorityBtn);
      // setActiveButton(category);
      navigate(`/ledgers/${category}`);
    } catch (e) {
      toast.warning(`failed to create Note,${e}`, {
        autoClose: 1200,
      });
    }
  };

  // if (REDUCER_CONSTANTS.WRITE_NOTE_CATEGORY)
  return (
    <div className="edit-note">
      <input
        type="text"
        placeholder="Title"
        onChange={(e) =>
          dispatchNote({
            type: REDUCER_CONSTANTS.WRITE_NOTE_TITLE,
            payload: e.target.value,
          })
        }
      />


      {/* react quill */}
      <div className="editor">
        <div style={{ height: "85%", color: "white" }}>
          <div ref={quillRef} />
        </div>
      </div>

      <div className="m-top edit-note-footer">
        <div className="flex-H-center-V">
          <select
            className="m-top m-right"
            onChange={(e) => {
              dispatchNote({
                type: REDUCER_CONSTANTS.WRITE_NOTE_CATEGORY,
                payload: e.target.value,
              });
            }}
          >
            <option value="All">Category</option>
            <option value="Polity">Polity</option>
            <option value="History">History</option>
            <option value="Geography">Geography</option>
            <option value="Art&Culture">Art&Culture</option>
            <option value="Society">society</option>
            <option value="IR">IR</option>
            <option value="Current Affairs">Current Affairs</option>
          </select>
          <select
            className="m-top m-right"
            onChange={(e) => {
              dispatchNote({
                type: REDUCER_CONSTANTS.WRITE_NOTE_lEVEL,
                payload: e.target.value,
              });
            }}
          >
            <option>Level..</option>
            <option value={PRIORITY.HIGH}>High</option>
            <option value={PRIORITY.MEDIUM}>Medium</option>
            <option value={PRIORITY.LOW}>Low</option>
          </select>
        </div>
        <div className="cta-section">
          <button className="primary-cta" onClick={createNoteHandler}>
            Add Note
          </button>
          <button
            className="secondary-cta"
            onClick={() => {
              setActiveButton("AllNotes");
              navigate(`/ledgers/AllNotes`);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="label-section">
        <div className="labels">
          {level && <div className="note-proiority-label">{level}</div>}
          {category && <div className="note-proiority-label">{category}</div>}
        </div>
        <button
          className="color-picker pin-note"
          onClick={() =>
            dispatchNote({
              type: REDUCER_CONSTANTS.WRITE_NOTE_PIN_STATUS,
              payload: !pinStatus,
            })
          }
        >
          {pinStatus ? (
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
          ) : (
            <svg
              class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="PushPinOutlinedIcon"
              className="tool"
            >
              <path d="M14 4v5c0 1.12.37 2.16 1 3H9c.65-.86 1-1.9 1-3V4h4m3-2H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3V4h1c.55 0 1-.45 1-1s-.45-1-1-1z"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export { LedgerNote, LedgerCard, WriteLedgerNote };


