import React from "react";

const RadioButton = ({ onHandleRadio, value, checked, name }) => {
  return (
    <div className="radio-button">
      <input
        type="radio"
        onChange={onHandleRadio}
        value={value}
        checked={checked}
      />{" "}
      <span>{name}</span>
    </div>
  );
};

export default RadioButton;
