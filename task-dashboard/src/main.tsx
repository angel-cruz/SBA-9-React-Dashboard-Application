import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Load Bootstrap first so its classes are available everywhere.
import 'bootstrap/dist/css/bootstrap.min.css';
// Our CSS only adds a few dashboard-specific styles.
import './App.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
