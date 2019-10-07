import React from "react";

const Counter = ({ onHandleDec, onHandleInc, decDisable, quantity }) => (
  <div className="counter">
    <button onClick={onHandleDec} disabled={decDisable}>
      -
    </button>
    <p>{quantity}</p>
    <button onClick={onHandleInc}>+</button>
  </div>
);

export default Counter;
