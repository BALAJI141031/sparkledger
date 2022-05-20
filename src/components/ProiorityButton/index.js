import "./index.css";
import { useDifferentNotes } from "../../Contexts";
function PriorityBtn({ filterType }) {
  const { setLevel, proiorityBtn, setProirityBtn } = useDifferentNotes();
  const proiorityHandler = () => {
    setProirityBtn(filterType);
    setLevel(filterType);
  };

  return (
    <div
      className={
        proiorityBtn === filterType
          ? "priority-filter style-btn"
          : "priority-filter"
      }
      onClick={proiorityHandler}
    >
      {filterType}
    </div>
  );
}

export default PriorityBtn;
