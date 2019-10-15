import React from "react";

const RadioButton = ({ onHandleRadio, value, checked, name, className }) => {
  return (
    <div className={className}>
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
