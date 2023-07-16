import React, { useMemo } from "react";
import { Badge, Button, Spinner } from "react-bootstrap";
import PropTypes from 'prop-types';

export const QuizBox = ({
  isLoading,
  countryToGuess,
  answers,
  submitAnswer,
  points,
}) => {
  const renderCountry = useMemo(() => {
    if (isLoading) {
      return <Spinner />;
    }

    return (
      <h3>
        <Badge>{countryToGuess.current}</Badge>
      </h3>
    );
  }, [isLoading, countryToGuess]);

  const renderAnswers = useMemo(() => {
    if (isLoading) {
      return <Spinner className="mx-auto my-2" />;
    }
    
    return answers.current.map((answer, index) => {
      return (
        <div key={index} className="mb-2">
          <h4>
            <Button
              onClick={() => submitAnswer(answer)}
              variant={"secondary"}
              className="mx-1"
            >
              {answer.capital}
            </Button>
          </h4>
        </div>
      );
    });
  }, [answers, isLoading]);

  return (
    <div className="py-3 px-5 bg-dark rounded text-light text-center shadow">
      <h1 className="mb-4">Quiz</h1>
      <span className="fs-5">What is the capital city of:</span>
      <br className="mb-3" />
      {renderCountry}
      <br className="mb-3" />
      <span className="italic fs-5">Answers:</span>
      <div className="mt-2 d-flex flex-row mb-1">{renderAnswers}</div>
      <span className="fs-1 mb-2">{points}</span>
    </div>
  );
};

QuizBox.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  countryToGuess: PropTypes.shape({
    current: PropTypes.string,
    next: PropTypes.string,
  }),
  answers: PropTypes.shape({
    current: PropTypes.arrayOf(PropTypes.shape({
      capital: PropTypes.string.isRequired,
      correct: PropTypes.bool.isRequired,
    }))
  }),
  submitAnswer: PropTypes.func.isRequired,
}

export default QuizBox;
