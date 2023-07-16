import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const EndBox = ({ correctAnswer, points, onClickRestart }) => {
  return (
    <div className="bg-light text-center p-4">
      <h3 className="text-center">Finished! :o</h3>
      <span className="fs-5">You scored <b>{points}</b> points!</span>
      <br />
      <span className="fs-5">Correct answer was: <b>{correctAnswer}</b></span>
      <br />
      <Button onClick={onClickRestart} className="mt-3 w-100" variant="primary" >Restart</Button>
    </div>
  )
};

EndBox.propTypes = {
  points: PropTypes.number.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  onRestart: PropTypes.func.isRequired,
}

export default EndBox;