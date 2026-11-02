import { useState, useEffect } from 'react';

/**
 * Live countdown hook for marketplace auctions
 * @param {string | number | Date} targetDate
 * @returns {{ hours: number, minutes: number, seconds: number, formatted: string, isExpired: boolean }}
 */
export function useCountdown(targetDate) {
  const calculateTimeLeft = () => {
    const diff = new Date(targetDate).getTime() - new Date().getTime();
    if (diff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, formatted: 'Ended', isExpired: true };
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const formatted = hours > 0
      ? `Ends in ${hours}h ${minutes}m`
      : `Ends in ${minutes}m ${seconds}s`;

    return { hours, minutes, seconds, formatted, isExpired: false };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
