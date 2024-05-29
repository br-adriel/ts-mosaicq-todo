import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { TarefasProvider } from './context/TarefasContext';
import './index.css';
import router from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TarefasProvider>
      <RouterProvider router={router} />
      <ToastContainer position='bottom-center' closeOnClick />
    </TarefasProvider>
  </React.StrictMode>
);
