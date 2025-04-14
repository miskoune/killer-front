import { CircleCheck, CircleX } from 'lucide-react';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className="bg-"
      icons={{
        success: <CircleCheck className="stroke-white w-6 h-6" />,
        error: <CircleX className="stroke-white w-6 h-6" />,
      }}
      toastOptions={{
        classNames: {
          toast: 'transition duration-500 hover:scale-105',
          success: 'bg-emerald-500',
          error: 'bg-red-500',
          title: 'ml-2 text-white text-m font-normal',
          description: 'ml-2 text-white/90 text-sm',
          cancelButton: 'cursor-pointer',
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
