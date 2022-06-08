import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { NotificationProvider } from './context/NotificationProvider';
import { NotesProvider } from './context/NotesProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <NotesProvider>
            <App />
          </NotesProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

