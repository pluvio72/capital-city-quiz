import React, { useCallback, useEffect, useState } from "react";
import { fetchQuestion, postAnswer } from "../api/countries";
import { Container } from "react-bootstrap";
import BackgroundNumber from "../components/BackgroundNumber";
import QuizBox from "../components/QuizBox";
import { useEventBus } from '../hooks/useEventBus';
import { EventTypes } from "../constants";
import { useNavigate } from "react-router-dom";

const initialState = {
  current: null,
  next: null,
}

export const QuizPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [countryToGuess, setCountryToGuess] = useState(initialState);
  const [answers, setAnswers] = useState(initialState);
  const [points, setPoints] = useState(0);

  const navigate = useNavigate();
  const { dispatch } = useEventBus();

  useEffect(() => {
    setIsLoading(true);

    const setup = async () => {
      const currentData = await fetchQuestion()
      if (currentData) {
        setCountryToGuess((prev) => ({ ...prev, current: currentData.country }));
        setAnswers((prev) => ({ ...prev, current: currentData.answers }));
      }

      const nextData = await fetchQuestion()
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

    const nextData = await fetchQuestion()
    if (nextData) {
      setCountryToGuess((prev) => ({ ...prev, next: nextData.country }));
      setAnswers((prev) => ({ ...prev, next: nextData.answers }));
    }
  }

  const submitAnswer = useCallback(
    async (answer) => {
      const data = await postAnswer({ country: countryToGuess.current, answer });

      if (data.correct) {
        dispatch(EventTypes.CORRECT_ANSWER);
        setPoints(points + 1);
        fetchNextQuestion();
      } else {
        navigate('/end', { state: { points, correctAnswer: data.answer } });
      }
    },
    [points, countryToGuess]
  );

  return (
    <Container className="h-100 justify-content-center align-items-center d-flex">
      <BackgroundNumber value={points} />
      <QuizBox
        submitAnswer={submitAnswer}
        answers={answers}
        countryToGuess={countryToGuess}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default QuizPage;
