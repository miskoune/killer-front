import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  // The ref object is a generic container whose current property is mutable
  const ref = useRef<T>(value);

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  });

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
