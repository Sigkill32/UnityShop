import React from "react";

const CheckBox = ({ onHandleCheck, name, value, checked, className }) => {
  return (
    <div className={className}>
      <input
        type="checkbox"
        onChange={onHandleCheck}
        name={name}
        value={value}
        checked={checked}
      />{" "}
      <span>{name}</span>
    </div>
  );
};

export default CheckBox;
