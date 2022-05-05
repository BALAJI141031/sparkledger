import "./index.css";
import { REDUCER_CONSTANTS } from "../../config/constants";
import { useDifferentNotes } from "../../Contexts";
import { editNote } from "../../networkCalls";
function ChangeTheme({ color, id, category }) {
  const { dispatchDifferentNotes } = useDifferentNotes();
  const colorHandler = () => {
    (async () => {
      try {
        let payload = {
          note: { noteColor: color },
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
        console.log(e);
      }
    })();
  };

  return (
    <button className={color} id="theme-style" onClick={colorHandler}></button>
  );
}

export { ChangeTheme };
