import React from "react";

const CheckBox = ({ onHandleCheck, name, value, checked, className }) => {
  return (
    <div>
      <input
        type="checkbox"
        onChange={onHandleCheck}
        name={name}
        value={value}
        checked={checked}
        className={className}
      />{" "}
      <span>{name}</span>
    </div>
  );
};

export default CheckBox;
