import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import AppRoutes from './AppRoutes';
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate';
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from 'sonner';
import { MantineProvider } from '@mantine/core';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={{ colorScheme: 'light' }}>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>
          <AppRoutes/>
          <Toaster visibleToasts={1} position="top-right" richColors />
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
    </MantineProvider>
  </React.StrictMode>,
)
