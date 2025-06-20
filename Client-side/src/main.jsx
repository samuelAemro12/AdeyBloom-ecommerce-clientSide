import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './routes';
import { TranslationProvider } from './context/TranslationContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TranslationProvider>
      <RouterProvider router={router} />
    </TranslationProvider>
  </StrictMode>
);