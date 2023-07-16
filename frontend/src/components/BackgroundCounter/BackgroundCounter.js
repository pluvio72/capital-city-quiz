import "./BackgroundCounter.css";

import React, { useEffect, useState } from "react";
import { useInterval } from "../../hooks/useInterval";
import PropTypes from "prop-types";
import useEventBus from "../../hooks/useEventBus";
import { EventTypes } from "../../constants/events";

export const BackgroundCounter = ({
  value,
  setValue,
  active,
  onEnd,
}) => {
  const [color, setColor] = useState("");
  const { on } = useEventBus();

  const handleCorrectAnswer = () => {
    console.log("DA:", color);
    if (color === "green") {
      setColor("red");
      // setColor("green");
    } else {
      console.log("green");
      setColor("green");
    }
  }

  useEffect(() => {
    on(EventTypes.SubmitCorrectAnswer, () => {
      handleCorrectAnswer();
    });
    on(EventTypes.SubmitWrongAnswer, () => setColor("red"));
  }, [handleCorrectAnswer]);


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
    <div id="backgroundTextParent" className="position-absolute t-0 l-0">
      <span onAnimationEnd={() => setColor('')} color={color} id="backgroundText">
        {value}
      </span>
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
