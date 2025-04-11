import { clsx } from 'clsx';

import Spinner from '@/assets/icons/spinner.svg';
import { isPromise } from '@/helpers/utils';
import { useSafeState } from '@/hooks/useSafeState';

const BASE_CLASSES = [
  'relative flex flex-row',
  'font-medium text-sm',
  'items-center justify-center',
  'p-4 rounded shadow',
  'transition-all duration-500 ease-in-out',
  'disabled:opacity-50 disabled:cursor-not-allowed',
  'hover:cursor-pointer',
  'md:w-auto w-full',
].join(' ');

const COLOR_CLASSES = {
  primary: [
    'bg-white',
    'hover:bg-white/80',
    'text-black',
    'hover:bg-primary-dark',
    'disabled:hover:bg-primary',
  ].join(' '),
  secondary: [
    'bg-secondary',
    'text-white',
    'hover:bg-secondary-dark',
    'disabled:hover:bg-secondary',
  ].join(' '),
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void | Promise<void>;
  children: string;
  color: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({
  onClick,
  children,
  color,
  disabled = false,
  ...props
}: Props): JSX.Element {
  const [isLoading, setLoading] = useSafeState(false);

  const handleClick = async (): Promise<void> => {
    if (!isPromise(onClick)) {
      return onClick();
    }

    setLoading(true);

    return onClick().finally(() => setLoading(false));
  };

  return (
    <button
      {...props}
      className={clsx(BASE_CLASSES, COLOR_CLASSES[color], props.className)}
      onClick={handleClick}
      type="button"
      disabled={isLoading || disabled}
    >
      {isLoading && <Spinner className="absolute h-5 w-5 animate-spin" />}
      <span className={clsx({ invisible: isLoading })}>{children}</span>
    </button>
  );
}
