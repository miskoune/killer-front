import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from '@/layout/Layout';
import { ContactPage } from '@/pages/Contact';
import { HomePage } from '@/pages/Home';
import { NotFoundPage } from '@/pages/NotFound';
import { PrivacyPage } from '@/pages/Privacy';

export function Routes() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          element: <Layout />,
          children: [
            { path: '/', element: <HomePage /> },
            { path: '/privacy', element: <PrivacyPage /> },
            { path: '/contact', element: <ContactPage /> },
            { path: '*', element: <NotFoundPage /> },
          ],
        },
      ])}
    />
  );
}
