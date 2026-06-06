import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { worker } from './msw/browser';

async function enableMockServiceWorker() {
  if (import.meta.env.VITE_ENABLE_MSW === 'TRUE') {
    await worker.start();
  }
  else {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
}

enableMockServiceWorker().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
