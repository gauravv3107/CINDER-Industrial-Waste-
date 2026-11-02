import { useState, useEffect } from 'react';

/**
 * Animated count-up hook for KPI numbers
 * @param {number} endValue
 * @param {number} [duration=800] Duration in milliseconds
 * @param {number} [decimals=0] Number of decimal places
 * @returns {number}
 */
export function useCountUp(endValue, duration = 800, decimals = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const startValue = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * easeProgress;
      setValue(Number(current.toFixed(decimals)));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setValue(endValue);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [endValue, duration, decimals]);

  return value;
}
