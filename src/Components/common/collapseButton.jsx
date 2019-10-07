import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faChevronCircleUp
} from "@fortawesome/free-solid-svg-icons";

const CollapseButton = ({ onHandleClick, brandCollapsed }) => {
  return (
    <button onClick={onHandleClick} className="collapse-button">
      <FontAwesomeIcon
        icon={brandCollapsed ? faChevronCircleDown : faChevronCircleUp}
      />
    </button>
  );
};

export default CollapseButton;
