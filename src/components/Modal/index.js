import "./index.css";
import { createNote, editNote, getNotes } from "../../networkCalls";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";

import { useWriteNote } from "../../Contexts";

import { useNavigate } from "react-router-dom";
import { useDifferentNotes } from "../../Contexts/index";

import { useNotifyUser } from "../../Contexts";

import { REDUCER_CONSTANTS, PRIORITY } from "../../config/constants";

export default function Modal({ setModal, id }) {
  const navigate = useNavigate();
  const { toast } = useNotifyUser();
  const { dispatchDifferentNotes, setActiveButton } = useDifferentNotes();
  const modules = {
    toolbar: [
      [{ header: [3, 4, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const { note, dispatchNote } = useWriteNote();

  const [updatedNote, updateNote] = useState({
    category: null,
    level: null,
    pinStatus: false,
    text: null,
    title: null,
  });

  // note to update
  useEffect(() => {
    (async () => {
      try {
        const notesResponse = await getNotes();
        let requiredNote = notesResponse.data.notes.filter(
          (note) => note._id === id
        );
        requiredNote = requiredNote[0];
        const { category, level, pinStatus, text, title } = requiredNote;
        updateNote({
          category: note.category,
          level,
          pinStatus,
          text,
          title,
        });
      } catch (e) {
        toast.error("Unexpected Error,Not able to Update Note");
      }
    })();
  }, []);

  // handler to edit notes
  const updateNoteHandler = async () => {
    try {
      if (updatedNote.title === null) throw "Title can't be empty";
      if (updatedNote.text === null) throw "Note Can't be empty";
      if (updatedNote.category === null) {
        // category = REDUCER_CONSTANTS.ALL_NOTES;
        updatedNote.category = "AllNotes";
      }

      const response = await editNote(id, {
        note: {
          [REDUCER_CONSTANTS.WRITE_NOTE_lEVEL]:
            updatedNote.level ?? PRIORITY.LOW,
          [REDUCER_CONSTANTS.WRITE_NOTE_TITLE]: updatedNote.title,
          [REDUCER_CONSTANTS.WRITE_NOTE_PIN_STATUS]: updatedNote.pinStatus,
          [REDUCER_CONSTANTS.WRITE_NOTE_CATEGORY]: updatedNote.category,
          [REDUCER_CONSTANTS.WRITE_NOTE_TEXT]: updatedNote.text,
        },
      });
      dispatchDifferentNotes({
        type: updatedNote.category,
        payload: true,
      });

      toast.success(
        `Sucessfully ${
          updatedNote.category === "AllNotes" ? "Random" : updatedNote.category
        } Note created `,
        {
          autoClose: 1200,
        }
      );
      setModal(false);
      navigate(`/ledgers/${updatedNote.category}`);
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
          value={`${updatedNote.title && updatedNote.title}`}
          onChange={(e) =>
            updateNote((prevNote) => ({ ...prevNote, title: e.target.value }))
          }
        />
        {/* react quill */}
        <div className="editor">
          <ReactQuill
            placeholder="Add your notes here"
            modules={modules}
            value={`${updatedNote.text && updatedNote.text}`}
            onChange={(e) => {
              updateNote((prevNote) => ({ ...prevNote, text: e }));
            }}
          />
        </div>

        <div className="m-top edit-note-footer">
          <div className="flex-H-center-V">
            <select
              className="m-top m-right"
              onChange={(e) => {
                updateNote((prevNote) => ({
                  ...prevNote,
                  category: e.target.value,
                }));
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
                updateNote((prevNote) => ({
                  ...prevNote,
                  level: e.target.value,
                }));
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
            <button className="primary-cta" onClick={updateNoteHandler}>
              Update Note
            </button>
          </div>
        </div>
        <div className="label-section">
          <div className="labels">
            {updatedNote.level && (
              <div className="note-proiority-label">{updatedNote.level}</div>
            )}
            {updatedNote.category && (
              <div className="note-proiority-label">{updatedNote.category}</div>
            )}
          </div>
          <button
            className="color-picker pin-note"
            onClick={() =>
              updateNote({ ...updatedNote, pinStatus: !updatedNote.pinStatus })
            }
          >
            {updatedNote.pinStatus ? (
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
