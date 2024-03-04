import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import zhCN from 'antd/lib/locale/zh_CN';

import './App.css';
import { store } from 'src/redux/store';
import Layout from 'src/Layout';

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
            <Provider store={store}>
              <Layout />
            </Provider>
          </ConfigProvider>
        </HashRouter>
      </div>
    );
  }
}

export default App;
