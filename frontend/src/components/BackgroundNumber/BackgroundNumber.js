import "./BackgroundNumber.css";

import React from "react";
import PropTypes from "prop-types";

export const BackgroundCounter = ({
  value,
}) => {
  return (
    <div id="backgroundText" className="position-absolute top-0 start-50">
      <span>{value}</span>
    </div>
  );
};

BackgroundCounter.propTypes = {
  value: PropTypes.number.isRequired,
};

export default BackgroundCounter;
