import "./BackgroundNumber.css";

import React from "react";
import PropTypes from "prop-types";

export const BackgroundCounter = ({
  value,
}) => {
  return (
    <div id="backgroundText" className="position-absolute t-0 l-0">
      <span>{value}</span>
    </div>
  );
};

BackgroundCounter.propTypes = {
  value: PropTypes.number.isRequired,
};

export default BackgroundCounter;
