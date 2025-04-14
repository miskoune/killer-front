import { cn } from '@/lib/utils';

interface Props {
  children: JSX.Element | string;
  className?: string;
}

function H1({ children, className }: Props) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl whitespace-pre-line',
        className,
      )}
    >
      {children}
    </h1>
  );
}

function H2({ children, className }: Props) {
  return (
    <h2
      className={cn(
        'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
    >
      {children}
    </h2>
  );
}

interface H3Props extends React.ComponentPropsWithoutRef<'h3'> {
  children: string | JSX.Element | JSX.Element[];
  className?: string;
}

function H3({ children, className, ...props }: H3Props) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function Blockquote({ children, className }: Props) {
  return (
    <blockquote
      className={cn('italic border-zinc-400 text-slate-400', className)}
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
