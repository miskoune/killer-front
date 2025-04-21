import { type BaseToastProps, ErrorToast } from 'react-native-toast-message';

export function CustomErrorToast(props: BaseToastProps): JSX.Element {
  return (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: '#F87171',
        height: 60,
        borderRadius: 10,
      }}
      text1Style={{ display: 'none' }}
      text2Style={{
        fontSize: 16,
        color: '#fff',
      }}
      text2NumberOfLines={3}
    />
  );
}
