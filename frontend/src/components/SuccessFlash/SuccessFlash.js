import React from 'react';
import { FaCheck } from 'react-icons/fa';
import "./SuccessFlash.css"

export const SuccessFlash = ({ success }) => {
  return (
    <div id="successFlash">
      <FaCheck color='green' size="128"/>
    </div>
  )
};

export default SuccessFlash;