import React, { useState } from 'react';
import { Button } from 'antd';

import axiosInstance from 'src/server';
import style from './style.module.scss';

/**
 * @description 首页
 * @author wudajian
 * @date 2022/06/08
 * @returns React.FC
 */
export const Home: React.FC = () => {
  const [random, setRandom] = useState(0);

  const handleOnClick = async () => {
    const response = await axiosInstance.get('https://dajianwu.github.io/static/data.json');
    console.log(response);
    setRandom(Math.random());
  };

  return (
    <div className={style.page}>
      <Button
        className={style.button}
        type='primary'
        onClick={handleOnClick}
      >
        Click Me! {random}
      </Button>
    </div>
  );
};
