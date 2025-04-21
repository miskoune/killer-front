import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Safe `setState` hook that prevents state update on unmounted component.
 */
export function useSafeState<T>(initialValue: T): [T, (value: T) => void] {
  const isMounted = useRef(true);
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Updating ref value on umounted component.
    return () => {
      isMounted.current = false;
    };
  }, []);

  const setStateSafe = useCallback((value: T) => {
    if (isMounted.current) {
      setState(value);
    }
  }, []);

  return [state, setStateSafe];
}
