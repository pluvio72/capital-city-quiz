import React, { useCallback } from 'react';
import { EndBox } from '../components/EndBox/EndBox';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export const EndPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  if (!state.points || !state.correctAnswer) {
    
  }

  const restart = useCallback(() => {
    navigate('/quiz');
  }, []);

  return (
    <Container className="h-100 justify-content-center align-items-center d-flex">
      <EndBox correctAnswer={state.correctAnswer} points={state.points} onClickRestart={restart}/>
    </Container>
  )
};

export default EndPage;