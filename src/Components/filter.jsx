import React from "react";
import CheckBox from "./common/checkBox";

const Filter = ({ brands, onHandleCheck, checked }) => {
  return (
    <div className="filter">
      {brands.length === 0 ? null : (
        <>
          {" "}
          <h3>Filters</h3>
          <div className="brands">
            {brands.map(brand => (
              <CheckBox
                key={brand === "" ? "unknown" : brand}
                name={brand === "" ? "unknown" : brand}
                onHandleCheck={onHandleCheck}
                value={brand === "" ? "unknown" : brand}
                checked={checked}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;
