import React, { useMemo } from "react";
import { Badge, Button, Spinner } from "react-bootstrap";
import PropTypes from 'prop-types';

export const QuizBox = ({
  isLoading,
  countryToGuess,
  answers,
  submitAnswer,
}) => {
  const renderCountry = useMemo(() => {
    if (isLoading) {
      return <Spinner />;
    }

    return (
      <h2>
        <Badge>{countryToGuess.current}</Badge>
      </h2>
    );
  }, [isLoading, countryToGuess]);

  const renderAnswers = useMemo(() => {
    if (isLoading) {
      return <Spinner className="mx-auto my-2" />;
    }
    
    return answers.current.map((answer, index) => {
      return (
        <div key={index} className="">
          <h4>
            <Button
              onClick={() => submitAnswer(answer.capital)}
              variant={"secondary"}
              className="mx-1 fw-bold"
            >
              {answer.capital}
            </Button>
          </h4>
        </div>
      );
    });
  }, [answers, isLoading]);

  return (
    <div className="py-3 px-5 bg-dark rounded text-light text-center">
      <h1 className="mb-4">Quiz</h1>
      <span className="fs-5">What is the capital city of:</span>
      <br className="mb-3" />
      {renderCountry}
      <br className="mb-3" />
      <span className="italic fs-5">Answers:</span>
      <div className="mt-2 d-flex flex-column mt-4 mb-2">{renderAnswers}</div>
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
