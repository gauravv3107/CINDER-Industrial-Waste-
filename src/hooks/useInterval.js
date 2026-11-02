import { useEffect, useRef } from 'react';

/**
 * Declarative interval hook that handles dynamic delays and pauses cleanly
 * @param {() => void} callback
 * @param {number | null} delay Delay in ms or null to pause
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null || delay === undefined) return;

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
