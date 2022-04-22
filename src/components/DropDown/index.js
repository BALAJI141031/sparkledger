import "./index.css";
const DropDown = ({ options, checkbox }) => {
  return (
    <div id="select-w">
      <select>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
