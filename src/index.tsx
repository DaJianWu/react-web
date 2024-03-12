import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import Layout from 'src/routes/Layout';
import './index.css';

/**
 * @description 应用入口
 * @author wudajian
 * @date 2022/06/08
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <HashRouter basename='/'>
          <ConfigProvider locale={zhCN}>
            <Layout />
          </ConfigProvider>
        </HashRouter>
      </div>
    );
  }
}

/**
 * @description 项目入口
 * @author wudajian
 * @date 2022/06/08
 */
ReactDOMClient.createRoot(document.getElementById('root') as Element).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// console.log(process.env.NODE_ENV, APP_ENV);

// if (module && module.hot) {
//   module.hot.accept();
// }
