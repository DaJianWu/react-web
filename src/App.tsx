import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import zhCN from 'antd/lib/locale/zh_CN';

import './App.css';
import { store } from './redux/store';
import { Home } from './pages/Home';

class App extends React.Component {
  public render() {
    return (
      <div className='app'>
        <ConfigProvider locale={zhCN}>
          <Provider store={store}>
            <Link to='/home'>go home</Link>
            <Routes>
              <Route path='/home' element={<Home />} />
            </Routes>
          </Provider>
        </ConfigProvider>
      </div>
    );
  }
}

export default App;
