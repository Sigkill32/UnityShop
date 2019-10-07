import React from "react";

const Counter = ({ onHandleDec, onHandleInc, quantity }) => (
  <div className="counter">
    <button onClick={onHandleDec} disabled={quantity === 1}>
      -
    </button>
    <p>{quantity}</p>
    <button onClick={onHandleInc}>+</button>
  </div>
);

export default Counter;
