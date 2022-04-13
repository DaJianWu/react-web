import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import './index.css';
import App from './App';

ReactDOMClient.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <HashRouter>
    <App />
  </HashRouter>
  // </React.StrictMode>
);

// if (module && module.hot) {
//   module.hot.accept();
// }
