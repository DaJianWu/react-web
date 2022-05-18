import React from 'react';

import style from './style.module.scss';

export const Page1: React.FC = () => {
  return (
    <div className={style.page}>
      <h1>page1</h1>
      <a href='https://juejin.cn/post/7098998314799988749'>当页面输入一个URL后发生了什么？</a>
    </div>
  );
};
