import { toast, ToastBar, Toaster } from 'react-hot-toast';

export function Notification(): JSX.Element {
  const closeNotification = (id: string) => (): void => {
    toast.dismiss(id);
  };

  return (
    <Toaster
      position="bottom-left"
      toastOptions={{
        duration: 5000,
        style: {
          color: '#fff',
        },
        success: {
          style: {
            backgroundColor: '#5CB85C',
          },
        },
        error: {
          style: {
            backgroundColor: '#F87171',
          },
        },
      }}
    >
      {(toaster) => (
        <div
          role="presentation"
          className="cursor-pointer"
          onClick={closeNotification(toaster.id)}
        >
          <ToastBar toast={toaster}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
              </>
            )}
          </ToastBar>
        </div>
      )}
    </Toaster>
  );
}
