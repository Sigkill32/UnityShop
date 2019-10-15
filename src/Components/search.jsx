import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ onHandleSearch, onHandleChange, searchStr }) => {
  return (
    <div className="search">
      <div className="search-box">
        <div className="search-icon" onClick={onHandleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          type="text"
          onChange={onHandleChange}
          value={searchStr}
          placeholder="Search for products"
        />
      </div>
    </div>
  );
};

export default Search;
