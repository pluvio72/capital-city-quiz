import React, { useEffect, useState } from "react";
import { useEventBus } from "../../hooks/useEventBus";
import { FaCheck } from "react-icons/fa";
import { EventTypes } from "../../constants";
import PropTypes from 'prop-types';

export const SuccessFlash = ({ ttl }) => {
  const [visible, setVisible] = useState(false);

  const { on, remove } = useEventBus();

  useEffect(() => {
    on(EventTypes.CORRECT_ANSWER, () => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, ttl * 1000);
    });

    return () => remove(EventTypes.CORRECT_ANSWER);
  }, [ttl]);

  if (visible) {
    return (
      <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-success rounded">
        <FaCheck size="64" /> 
      </div>
    );
  } else {
    return null;
  }
};

SuccessFlash.defaultProps = {
  ttl: PropTypes.number.isRequired,
};

export default SuccessFlash;
