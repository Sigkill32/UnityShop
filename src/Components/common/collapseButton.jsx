import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faChevronCircleUp
} from "@fortawesome/free-solid-svg-icons";

const CollapseButton = ({ onHandleClick, collapsed }) => {
  return (
    <button onClick={onHandleClick} className="collapse-button">
      <FontAwesomeIcon
        icon={collapsed ? faChevronCircleDown : faChevronCircleUp}
      />
    </button>
  );
};

export default CollapseButton;
