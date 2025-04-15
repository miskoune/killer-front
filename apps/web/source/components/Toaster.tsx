import { CircleCheck, CircleX } from 'lucide-react';
import { type ComponentProps } from 'react';
import { Toaster as Sonner } from 'sonner';

interface ToasterProps extends ComponentProps<typeof Sonner> {}

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      closeButton
      icons={{
        success: <CircleCheck className="stroke-white w-6 h-6" />,
        error: <CircleX className="stroke-white w-6 h-6" />,
      }}
      toastOptions={{
        classNames: {
          closeButton: '!bg-white/80 hover:!bg-white !transition !duration-500',
          success: '!bg-emerald-500 !border-none',
          error: '!bg-red-500 !border-none',
          title: 'ml-2 !text-white/80 !text-sm',
        },
      }}
      {...props}
    />
  );
}
