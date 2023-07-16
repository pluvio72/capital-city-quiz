import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaChevronRight } from 'react-icons/fa';

export const StartPage = () => {
  return (
    <Container className="h-100 d-flex justify-content-center align-items-center" fluid>
      <Button size="lg" variant="primary" href="/quiz">
        Start Quiz
        <FaChevronRight className="mb-1 ms-2" />
      </Button>
    </Container>
  )
};

export default StartPage;