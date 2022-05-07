import { createContext, useState, useContext, useReducer } from "react";
import { REDUCER_CONSTANTS, PRIORITY } from "../config/constants";
const displayNotesContext = createContext();
function DisplayNotesProvider({ children }) {
  const differentNotesHandler = (prevNotes, { type, payload }) => {
    const navCategories = Object.keys(prevNotes);
    if (type !== REDUCER_CONSTANTS.ALL_NOTES_LIST) {
      for (let i = 0; i < navCategories.length; i++) {
        if (navCategories[i] !== REDUCER_CONSTANTS.ALL_NOTES_LIST) {
          prevNotes[navCategories[i]] = false;
        }
      }
    }

    return { ...prevNotes, [type]: payload };
  };

  const [notes, dispatchDifferentNotes] = useReducer(differentNotesHandler, {
    [REDUCER_CONSTANTS.GEOGRAPHY_NOTES]: false,
    [REDUCER_CONSTANTS.POLITY_NOTES]: false,
    [REDUCER_CONSTANTS.HISTORY_NOTES]: false,
    [REDUCER_CONSTANTS.IR_NOTES]: false,
    [REDUCER_CONSTANTS.ALL_NOTES]: false,
    [REDUCER_CONSTANTS.ART_AND_CULTURE]: false,
    [REDUCER_CONSTANTS.PINNED_NOTES]: false,
    [REDUCER_CONSTANTS.CURRENT_AFFAIRS_NOTES]: false,
    [REDUCER_CONSTANTS.TRASHED_NOTES]: false,
    [REDUCER_CONSTANTS.ALL_NOTES_LIST]: [],
  });

  const [sortBy, setSortBy] = useState(true);
  const [level, setLevel] = useState(PRIORITY.HIGH);
  const [proiorityBtn, setProirityBtn] = useState(PRIORITY.HIGH);
  const navCategories = Object.entries(notes);
  let requiredFilter;
  let categoryFilteredNotes = [];
  navCategories.forEach((category) => {
    if (category[1] === true) {
      //  here it is coming
      requiredFilter = category[0];
    }
  });

  if (notes[REDUCER_CONSTANTS.ALL_NOTES_LIST].length !== 0) {
    if (requiredFilter === REDUCER_CONSTANTS.PINNED_NOTES) {
      let primaryFilter = notes[REDUCER_CONSTANTS.ALL_NOTES_LIST].filter(
        (note) => note.pinStatus && !note.trash
      );
      categoryFilteredNotes = [...primaryFilter];
    } else if (requiredFilter === REDUCER_CONSTANTS.TRASHED_NOTES) {
      let primaryFilter = notes[REDUCER_CONSTANTS.ALL_NOTES_LIST].filter(
        (note) => note.trash
      );
      categoryFilteredNotes = [...primaryFilter];
    } else {
      let primaryFilter = notes[REDUCER_CONSTANTS.ALL_NOTES_LIST].filter(
        (note) => {
          return requiredFilter === "AllNotes"
            ? true && !note.trash
            : requiredFilter === note.category && !note.trash;
        }
      );
      categoryFilteredNotes = [...primaryFilter];
    }
  }

  // sort handler
  function sortHandler(notes) {
    const initalNotes = [...notes];

    if (sortBy) {
      return initalNotes.sort((a, b) => {
        return a.dateToComapre - b.dateToComapre;
      });
    }
    return initalNotes.sort((a, b) => b.dateToComapre - a.dateToComapre);
  }
  const sortedNotes = sortHandler(categoryFilteredNotes);

  // proiority filters
  const resultedNotes = sortedNotes.filter((note) => level === note.level);
  categoryFilteredNotes = [...resultedNotes];

  return (
    <displayNotesContext.Provider
      value={{
        notes,
        dispatchDifferentNotes,
        categoryFilteredNotes,
        setSortBy,
        setLevel,
        proiorityBtn,
        setProirityBtn,
      }}
    >
      {children}
    </displayNotesContext.Provider>
  );
}

const useDifferentNotes = () => useContext(displayNotesContext);

export { DisplayNotesProvider, useDifferentNotes };
