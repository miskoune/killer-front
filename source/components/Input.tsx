import { type ChangeEvent, type ForwardedRef, forwardRef } from 'react';
import tw, { styled } from 'twin.macro';

const Content = tw.div`
  flex flex-col w-full 
  mt-1
`;

const StyledInput = styled.input<{ uppercase: boolean }>`
  ${({ uppercase }) => (uppercase ? tw`uppercase` : tw`normal-case`)}

  ${tw`p-1 text-3xl rounded-md
  border-solid border-2 border-blue-100
  outline-none transition duration-200 ease-in
  focus-visible:border-blue-300`}
`;

const StyledLabel = tw.label`
  font-bold text-lightDark pb-1
`;

interface Props {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  label?: string;
  uppercase?: boolean;
}

function InputRef(
  {
    id,
    value,
    onChange,
    type = 'text',
    placeholder,
    label,
    uppercase = false,
  }: Props,
  ref: ForwardedRef<HTMLInputElement>,
): JSX.Element {
  return (
    <Content>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledInput
        id={id}
        value={value}
        onChange={onChange}
        ref={ref}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        uppercase={uppercase}
      />
    </Content>
  );
}

export const Input = forwardRef(InputRef);
