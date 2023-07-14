import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const EndBox = ({ points, onRestart }) => {
  return (
    <div className="bg-light text-center p-4">
      <h3 className="text-center">Finished! :o</h3>
      <span className="fs-5">You scored {points} points!</span>
      <Button onClick={onRestart} className="mt-3 w-100" variant="primary" >Restart</Button>
    </div>
  )
};

EndBox.propTypes = {
  points: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
}

export default EndBox;