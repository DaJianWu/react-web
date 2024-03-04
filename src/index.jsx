import React from 'react';
import ReactDOMClient from 'react-dom/client';

import './index.css';
import App from './App';

/**
 * @description 项目入口
 * @author wudajian
 * @date 2022/06/08
 */
ReactDOMClient.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// if (module && module.hot) {
//   module.hot.accept();
// }
