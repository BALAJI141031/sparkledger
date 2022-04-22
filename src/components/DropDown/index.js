const DropDown = ({ options }) => {
  return (
    <select>
      {options.map((option) => (
        <option>{option}</option>
      ))}
    </select>
  );
};

export default DropDown;
