import React, { useCallback, useEffect, useMemo, useState } from "react";
import { fetchCountries } from "../api/countries";
import { Badge, Button, Container, Spinner } from "react-bootstrap";
import BackgroundCounter from "../components/BackgroundCounter";

export const QuizPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countryToGuess, setCountryToGuess] = useState(null);
  const [answers, setAnswers] = useState([]);

  const [win, setWin] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (!countryToGuess) {
      fetchCountries().then((data) => {
        if (data) {
          setCountryToGuess(data.country);
          setAnswers(data.answers);
          setIsLoading(false);
        }
      });
    }
  }, []);

  const submitAnswer = (answer) => {
    if (answer.correct) {
      setWin(true);
    } else {
      setWin(false);
    }
    setCountryToGuess(null);
    setAnswers([]);
  };

  const onTimerEnd = useCallback(() => {
    setWin(false);
    setCountryToGuess(null);
    setAnswers([]);
  }, []);

  const renderCountry = useMemo(() => {
    if (isLoading) {
      return <Spinner />
    }

    return (
      <h3>
        <Badge>{countryToGuess}</Badge>
      </h3>
    )

  }, [isLoading, countryToGuess]);

  const renderAnswers = useMemo(() => {
    if (isLoading) {
      return <Spinner className="mx-auto my-2" />
    }

    return answers.map((answer, index) => {
      return (
        <div key={index} className="mb-2">
          <h4>
            <Button
              onClick={() => submitAnswer(answer)}
              variant={"success"}
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
    <Container className="h-100 justify-content-center align-items-center d-flex">
      <BackgroundCounter startingValue={10} onEnd={onTimerEnd} />
      {win === null ?
        <div className="py-3 px-5 bg-dark rounded text-light text-center">
          <h1 className="mb-4">Quiz</h1>
          <span className="fs-5">What is the capital city of:</span>
          <br className="mb-3" />
          {renderCountry}
          <br className="mb-3" />
          <span className="italic fs-5">Answers:</span>
          <div className="mt-2 d-flex flex-row mb-1">{renderAnswers}</div>
        </div>
        :
        <p>Play again? You: {win ? 'WIN' : 'LOSE'}</p>
      }
    </Container>
  );
};

export default QuizPage;
