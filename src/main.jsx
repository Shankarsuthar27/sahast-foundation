import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { CmsProvider } from './context/CmsContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
      <CmsProvider>
        <App />
      </CmsProvider>
    </AdminAuthProvider>
  </StrictMode>
);
