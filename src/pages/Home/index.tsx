import React from 'react';
import { Button } from 'antd';

import style from './style.module.scss';

export const Home: React.FC = () => {
  return (
    <div className={style.page}>
      <Button type='primary' className={style.button}>
        Home
      </Button>
    </div>
  );
};
