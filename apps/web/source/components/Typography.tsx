interface Props {
  children: JSX.Element | string;
}

function H1({ children }: Props) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl whitespace-pre-line">
      {children}
    </h1>
  );
}

function H2({ children }: Props) {
  return (
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

interface H3Props extends React.ComponentPropsWithoutRef<'h3'> {
  children: string | JSX.Element | JSX.Element[];
}

function H3({ children }: H3Props) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

function Blockquote({ children }: Props) {
  return (
    <blockquote className="italic border-zinc-400 text-slate-400">
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
