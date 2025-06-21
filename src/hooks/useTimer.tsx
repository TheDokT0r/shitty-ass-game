import { useEffect, useState } from "react";

export default function useCountdown(seconds: number, onEnd: () => void) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  const restartTimer = () => {
    setTimeLeft(seconds);
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      onEnd();
      restartTimer();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onEnd]);

  return {timeLeft, restartTimer};
}
