import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { UserProvider } from './contexts/UserContext.jsx';
import { ModalProvider } from './contexts/modalContext.jsx';

import App from './App.jsx';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
