module.exports = {
  REDUCER_CONSTANTS: {
    WRITE_NOTE_CATEGORY: "category",
    WRITE_NOTE_lEVEL: "level",
    WRITE_NOTE_TITLE: "title",
    WRITE_NOTE_TEXT: "text",
    WRITE_NOTE_PIN_STATUS: "pinStatus",
    // ledgers page constansts
    ALL_NOTES_LIST: "NotesList",
    POLITY_NOTES: "Polity",
    HISTORY_NOTES: "History",
    IR_NOTES: "IR",
    CURRENT_AFFAIRS_NOTES: "Current Affairs",
    ALL_NOTES: "AllNotes",
    ART_AND_CULTURE: "Art&Culture",
    PINNED_NOTES: "PinnedNotes",
    GEOGRAPHY_NOTES: "Geography",
    TRASHED_NOTES: "trash",
  },
  PATHS: {
    WRITE_LEDGER: "/write/ledger",
    LOGIN: "/user/login",
    SIGNUP: "/user/signup",
    LEDGERS: "/ledgers/:category",
    HOME: "/",
    MOCK: "/mock",
  },
  SORT: {
    NEWEST_FIRST: "New-first",
    OLDEST_FIRST: "Old-first",
  },
  PRIORITY: {
    MEDIUM: "medium",
    LOW: "low",
    HIGH: "high",
  },
  NOTE_COLOR: {
    DEFAULT_SHADE: "purple",
    RED_SHADE: "red",
    ORANGE_SHADE: "orange",
    YELLOW_SHADE: "yellow",
  },
};
