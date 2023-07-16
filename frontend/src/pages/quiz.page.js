import React, { useCallback, useEffect, useState } from "react";
import { fetchCountries, postAnswer } from "../api/countries";
import { Container } from "react-bootstrap";
import BackgroundNumber from "../components/BackgroundNumber";
import EndBox from "../components/EndBox";
import QuizBox from "../components/QuizBox";

const initialState = {
  current: null,
  next: null,
}

export const QuizPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [countryToGuess, setCountryToGuess] = useState(initialState);
  const [answers, setAnswers] = useState(initialState);

  const [finished, setFinished] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    const setup = async () => {
      const currentData = await fetchCountries()
      if (currentData) {
        setCountryToGuess((prev) => ({ ...prev, current: currentData.country }));
        setAnswers((prev) => ({ ...prev, current: currentData.answers }));
      }

      const nextData = await fetchCountries()
      if (nextData) {
        setCountryToGuess((prev) => ({ ...prev, next: nextData.country }));
        setAnswers((prev) => ({ ...prev, next: nextData.answers }));
      }
      
      setIsLoading(false);
    }

    setup();
  }, []);

  const fetchNextQuestion = async () => {
    // set current to next then fetch next
    setCountryToGuess((prev) => ({ ...prev, current: prev.next }));
    setAnswers((prev) => ({ ...prev, current: prev.next }));

    const nextData = await fetchCountries()
    if (nextData) {
      setCountryToGuess((prev) => ({ ...prev, next: nextData.country }));
      setAnswers((prev) => ({ ...prev, next: nextData.answers }));
    }
  }

  const submitAnswer = useCallback(
    async (answer) => {
      const data = await postAnswer({ country: countryToGuess.current, answer: answer });

      if (data.correct) {
        setPoints(points + 1);
        fetchNextQuestion();
      } else {
        setFinished(true);
      }
    },
    [points, countryToGuess]
  );

  const onRestart = useCallback(() => {
    fetchNextQuestion();
    setFinished(false);
    setPoints(0);
  }, []);

  return (
    <Container className="h-100 justify-content-center align-items-center d-flex">
      <BackgroundNumber value={points} />
      {finished ? (
        <EndBox points={points} onRestart={onRestart} />
      ) : (
        <QuizBox
          submitAnswer={submitAnswer}
          answers={answers}
          countryToGuess={countryToGuess}
          isLoading={isLoading}
        />
      )}
    </Container>
  );
};

export default QuizPage;
