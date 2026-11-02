import { useEffect } from 'react';

/**
 * Global keyboard shortcut listener
 * @param {string} key e.g. 'k', 'Escape'
 * @param {() => void} callback
 * @param {{ metaKey?: boolean, ctrlKey?: boolean, preventDefault?: boolean }} [options]
 */
export function useHotkey(key, callback, options = {}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const matchKey = event.key.toLowerCase() === key.toLowerCase();
      const matchMeta = options.metaKey ? (event.metaKey || event.ctrlKey) : true;
      const matchCtrl = options.ctrlKey ? event.ctrlKey : true;

      if (matchKey && matchMeta && matchCtrl) {
        if (options.preventDefault) {
          event.preventDefault();
        }
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, callback, options]);
}
