import "./index.css";
import { createNote, editNote } from "../../networkCalls";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { useWriteNote } from "../../Contexts";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDifferentNotes } from "../../Contexts/index";
import { useNotifyUser } from "../../Contexts";
import {
  REDUCER_CONSTANTS,
  PRIORITY,
  NOTE_COLOR,
} from "../../config/constants";

export default function Modal({ setModal }) {
  const navigate = useNavigate();
  const { toast } = useNotifyUser();
  const { dispatchDifferentNotes } = useDifferentNotes();
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

      navigate(`/ledgers/:${category}`);
    } catch (e) {
      toast.warning(`failed to create Note,${e}`, {
        autoClose: 1200,
      });
    }
  };

  return (
    <div className="modal-div" onClick={() => setModal(false)}>
      <div className="edit-note" onClick={(e) => e.stopPropagation()}>
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
                console.log("while changing", e.target.value);
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
            <button className="secondary-cta" onClick={() => setModal(false)}>
              Close
            </button>
            <button className="primary-cta" onClick={createNoteHandler}>
              Update Note
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
    </div>
  );
}
