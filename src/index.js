import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { NotificationProvider } from './context/NotificationProvider';
import { NotesProvider } from './context/NotesProvider';
import { FilterProvider } from './context/FilterProvider';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <NotesProvider>
            <FilterProvider>
              <App />
            </FilterProvider>
          </NotesProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

