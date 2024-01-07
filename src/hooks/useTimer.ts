/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

interface UseTimerHookProps {
  duration: number;
  currentAttemptedQuizKey?: number;
  handleTimerFinish: () => void;
}

export const useTimer = ({
  duration,
  currentAttemptedQuizKey,
  handleTimerFinish,
}: UseTimerHookProps) => {
  const [seconds, setSeconds] = useState(duration * 60);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    };

    startInterval();

    const checkTimer = () => {
      if (
        seconds <= 0 ||
        !window.location.pathname.startsWith(
          `/questions/answer/${currentAttemptedQuizKey}`
        )
      ) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        handleTimerFinish();
      }
    };

    checkTimer();

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (seconds > 0) {
        const confirmed = confirm(
          "Are you sure you want to leave? The timer will be stopped."
        );

        if (confirmed) {
          handleTimerFinish();
        } else {
          event.preventDefault();
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(intervalRef.current);
    };
  }, [seconds, duration, currentAttemptedQuizKey, handleTimerFinish]);

  return [seconds];
};
