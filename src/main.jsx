import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import './style.css';
if(import.meta.env.DEV)document.querySelector('base').href='/';
createRoot(document.getElementById('root')).render(<React.StrictMode><ErrorBoundary><App/></ErrorBoundary></React.StrictMode>);
import './quality.css';
