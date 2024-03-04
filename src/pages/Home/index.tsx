import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import style from './style.module.scss';
import { selectorLoading, selectorValue, init, fetchData } from 'src/redux';

/**
 * @description 首页
 * @author wudajian
 * @date 2022/06/08
 * @returns React.FC
 */
export const Home: React.FC = () => {
  const loading = useSelector(selectorLoading);
  const value = useSelector(selectorValue);
  const dispatch = useDispatch();

  const [random, setRandom] = useState(0);

  useEffect(() => {
    dispatch(init({ value: 'hello' }));
  }, []);

  const handleOnClick = () => {
    // @ts-ignore
    dispatch(fetchData);
    setRandom(Math.random());
  };

  return (
    <div className={style.page}>
      <Button
        className={style.button}
        type='primary'
        loading={loading}
        onClick={handleOnClick}
      >
        Click Me! {value} {Boolean(random) && random}
      </Button>
    </div>
  );
};
