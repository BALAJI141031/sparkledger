import { createContext, useContext, useReducer } from "react";
const { REDUCER_CONSTANTS } = require("../config/constants");
const writeNoteContext = createContext({});

function WriteNoteProvider({ children }) {
  const dispatchNoteHandler = (prevNote, { type, payload }) => {
    switch (type) {
      case REDUCER_CONSTANTS.WRITE_NOTE_CATEGORY:
        return {
          ...prevNote,
          [REDUCER_CONSTANTS.WRITE_NOTE_CATEGORY]: payload,
        };
      case REDUCER_CONSTANTS.WRITE_NOTE_lEVEL:
        return {
          ...prevNote,
          [REDUCER_CONSTANTS.WRITE_NOTE_lEVEL]: payload,
        };
      case REDUCER_CONSTANTS.WRITE_NOTE_TITLE:
        return {
          ...prevNote,
          [REDUCER_CONSTANTS.WRITE_NOTE_TITLE]: payload,
        };
      case REDUCER_CONSTANTS.WRITE_NOTE_TEXT:
        return {
          ...prevNote,
          [REDUCER_CONSTANTS.WRITE_NOTE_TEXT]: payload,
        };
      case REDUCER_CONSTANTS.WRITE_NOTE_PIN_STATUS:
        return {
          ...prevNote,
          [REDUCER_CONSTANTS.WRITE_NOTE_PIN_STATUS]: payload,
        };
    }
  };

  const [note, dispatchNote] = useReducer(dispatchNoteHandler, {
    [REDUCER_CONSTANTS.WRITE_NOTE_CATEGORY]: null,
    [REDUCER_CONSTANTS.WRITE_NOTE_lEVEL]: null,
    [REDUCER_CONSTANTS.WRITE_NOTE_TITLE]: null,
    [REDUCER_CONSTANTS.WRITE_NOTE_TEXT]: null,
    [REDUCER_CONSTANTS.WRITE_NOTE_PIN_STATUS]: false,
  });
  return (
    <writeNoteContext.Provider value={{ dispatchNote, note }}>
      {children}
    </writeNoteContext.Provider>
  );
}

const useWriteNote = () => useContext(writeNoteContext);

export { WriteNoteProvider, useWriteNote };
