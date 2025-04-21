import { type PropsWithChildren } from 'react';

import { classNames } from '@/helpers/utils';

interface HeadingProps extends PropsWithChildren {
  className?: string;
}

function H1({ children, className }: HeadingProps) {
  return (
    <h1
      className={classNames(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl whitespace-pre-line',
        className,
      )}
    >
      {children}
    </h1>
  );
}

function H2({ children, className }: HeadingProps) {
  return (
    <h2
      className={classNames(
        'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
    >
      {children}
    </h2>
  );
}

function H3({ children, className }: HeadingProps) {
  return (
    <h3
      className={classNames(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
    >
      {children}
    </h3>
  );
}

function Blockquote({ children, className }: HeadingProps) {
  return (
    <blockquote
      className={classNames('italic border-zinc-400 text-slate-400', className)}
    >
      {children}
    </blockquote>
  );
}

export const Typography = {
  H1,
  H2,
  H3,
  Blockquote,
};
