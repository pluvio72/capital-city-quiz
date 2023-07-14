import { useEffect, useRef } from "react";

// custom hook to solve issue of setting interval in initial render useEffect
// (setInterval won't have access to updated state variables since it should be called once)
export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval