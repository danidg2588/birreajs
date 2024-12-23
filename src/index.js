import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CommingSoon from './Components/Home/ComingSoon/CommingSoon';
// import { AuthProvider } from './Components/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/">
    {/* <App /> */}
    <CommingSoon />
  </BrowserRouter>
);
