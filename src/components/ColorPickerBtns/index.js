import "./index.css";
import { REDUCER_CONSTANTS } from "../../config/constants";
import { useDifferentNotes, useNotifyUser } from "../../Contexts";
import { editNote } from "../../networkCalls";
function ChangeTheme({ color, id, category }) {
  const { dispatchDifferentNotes } = useDifferentNotes();
  const colorHandler = () => {
    const { toast } = useNotifyUser;
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
        toast.error("Unexpected Error,Not able to edit");
      }
    })();
  };

  return (
    <button className={color} id="theme-style" onClick={colorHandler}></button>
  );
}

export { ChangeTheme };
