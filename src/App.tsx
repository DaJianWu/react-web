import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import './App.css';
import { Home } from './pages/Home';

class App extends React.Component {
  public render() {
    return (
      <div className='app'>
        <ConfigProvider locale={zhCN}>
          <Link to='/home'>go home</Link>
          <Routes>
            <Route path='/home' element={<Home />} />
          </Routes>
        </ConfigProvider>
      </div>
    );
  }
}

export default App;
