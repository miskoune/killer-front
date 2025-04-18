import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import { Toaster } from '@/components/Toaster';
import { QueryConfig } from '@/constants/config';
import { ModalProvider } from '@/context/modal';
import { setupIntl } from '@/translations';

import { Routes } from './routes';

import '@/assets/styles/index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

setupIntl(localStorage.getItem('locale'));

function App() {
  const queryClient = new QueryClient(QueryConfig);

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <Routes />
      </ModalProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

root.render(<App />);
