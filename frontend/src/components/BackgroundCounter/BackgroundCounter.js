import "./BackgroundCounter.css";

import React from "react";
import { useInterval } from "../../hooks/useInterval";
import PropTypes from "prop-types";

export const BackgroundCounter = ({
  value,
  setValue,
  active,
  onEnd,
}) => {
  useInterval(() => {
    if (active) {
      if (value > 1) {
        setValue(value - 1);
      } else {
        onEnd();
      }
    }
  }, 1000);

  return (
    <div id="backgroundText" className="position-absolute t-0 l-0">
      <span>{value}</span>
    </div>
  );
};

BackgroundCounter.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  onEnd: PropTypes.func,
};

export default BackgroundCounter;
