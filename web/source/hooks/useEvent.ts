import { useEffect } from 'react';

export function useEvent(
  event: keyof WindowEventMap,
  handler: () => void,
): void {
  useEffect(() => {
    /**
     * Initiate the event handler.
     */
    window.addEventListener(event, handler);

    /**
     * Clean-up the event every time the component is re-rendered.
     */
    return function cleanup() {
      window.removeEventListener(event, handler);
    };
  });
}
