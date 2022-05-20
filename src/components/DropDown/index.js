import "./index.css";
import { SORT, PRIORITY, REDUCER_CONSTANTS } from "../../config/constants";
import { useDifferentNotes } from "../../Contexts";
import { toast } from "react-toastify";
import { editNote } from "../../networkCalls";

const DropDown = ({ options, id, category }) => {
  const { setSortBy } = useDifferentNotes();
  const { dispatchDifferentNotes } = useDifferentNotes();
  const selectHandler = (e) => {
    const dropdownValue = e.target.value;
    if (dropdownValue === SORT.NEWEST_FIRST) setSortBy(false);
    if (dropdownValue === SORT.OLDEST_FIRST) setSortBy(true);
    if (
      dropdownValue === PRIORITY.HIGH ||
      dropdownValue === PRIORITY.MEDIUM ||
      dropdownValue === PRIORITY.LOW
    ) {
      (async () => {
        try {
          toast.warning("level changed", {
            autoClose: 1000,
          });
          let payload = {
            note: { [REDUCER_CONSTANTS.WRITE_NOTE_lEVEL]: dropdownValue },
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
          toast.error("Unexpected Error,Not able to edit");
        }
      })();
    }

    if (
      dropdownValue === REDUCER_CONSTANTS.POLITY_NOTES ||
      dropdownValue === REDUCER_CONSTANTS.HISTORY_NOTES ||
      dropdownValue === REDUCER_CONSTANTS.IR_NOTES ||
      dropdownValue === REDUCER_CONSTANTS.CURRENT_AFFAIRS_NOTES ||
      dropdownValue === REDUCER_CONSTANTS.ART_AND_CULTURE ||
      dropdownValue === REDUCER_CONSTANTS.GEOGRAPHY_NOTES
    ) {
      console.log("yes coming here");
      (async () => {
        try {
          toast.warning("category changed", {
            autoClose: 1000,
          });
          let payload = {
            note: { [REDUCER_CONSTANTS.WRITE_NOTE_CATEGORY]: dropdownValue },
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
          toast.error("Unexpected Error,Not able to edit");
        }
      })();
    }
  };

  return (
    <div id="select-w">
      <select onChange={selectHandler}>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
    