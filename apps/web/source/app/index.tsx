import { setupIntl } from '@killerparty/intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import { Toaster } from '@/components/Toaster';
import { QueryConfig } from '@/constants/config';
import { ModalProvider } from '@/context/modal';
import { SidebarProvider } from '@/context/sidebar';

import { Routes } from './routes';

import '@/assets/styles/app.module.css';
import '@/assets/styles/index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

setupIntl(localStorage.getItem('locale'));

function App(): JSX.Element {
  const queryClient = new QueryClient(QueryConfig);

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <SidebarProvider>
          <Routes />
        </SidebarProvider>
      </ModalProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

root.render(<App />);
