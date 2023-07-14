import './BackgroundCounter.css';

import React, { useState } from 'react';
import { useInterval } from '../../hooks/useInterval';
import PropTypes from 'prop-types';

export const BackgroundCounter = ({ startingValue, onEnd }) => {
  const [count, setCount] = useState(startingValue);

  useInterval(() => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      onEnd();
    }
  }, 1000);

  return (
    <div id="backgroundText" className="position-absolute t-0 l-0">
      <span>{count}</span>
    </div>
  )
};

BackgroundCounter.propTypes = {
  startingValue: PropTypes.number.isRequired,
  onEnd: PropTypes.func,
};

export default BackgroundCounter;