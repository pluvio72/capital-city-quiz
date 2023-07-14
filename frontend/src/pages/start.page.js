import React from 'react';
import { Button, Container } from 'react-bootstrap';

export const StartPage = () => {
  return (
    <Container className="h-100 d-flex justify-content-center align-items-center" fluid>
      <Button size="lg" variant="primary" href="/quiz">Start Quiz</Button>
    </Container>
  )
};

export default StartPage;