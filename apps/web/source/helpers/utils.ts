import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function isPromise(
  func: () => void | Promise<void>,
): func is () => Promise<void> {
  if (func.constructor.name === 'AsyncFunction') {
    return true;
  }

  return false;
}

export function wait(ms = 5000): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function classNames(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
