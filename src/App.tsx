import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import zhCN from 'antd/lib/locale/zh_CN';

import './App.css';
import { store } from './redux/store';
import { Layout } from 'src/Layout';

class App extends React.Component {
  public render() {
    return (
      <div className='app'>
        <ConfigProvider locale={zhCN}>
          <Provider store={store}>
            <Layout />
          </Provider>
        </ConfigProvider>
      </div>
    );
  }
}

export default App;
