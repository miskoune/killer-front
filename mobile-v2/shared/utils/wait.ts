import { WAIT_TIME } from '../constants/timers';

export function wait(ms = WAIT_TIME): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
