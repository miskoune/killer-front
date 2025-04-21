interface OnEnterProps {
  key: string;
  fn: () => void;
}

export const onEnter = ({ key, fn }: OnEnterProps): void => {
  if (key === 'Enter') {
    fn();
  }
};
