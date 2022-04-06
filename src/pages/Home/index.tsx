import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import style from './style.module.scss';
import { selectorValue, fetchData } from '../../redux';

export const Home: React.FC = () => {
  const value = useSelector(selectorValue);
  const dispatch = useDispatch();

  return (
    <div className={style.page}>
      <Button
        type='primary'
        className={style.button}
        onClick={() => dispatch(fetchData)}
      >
        Home {value}
      </Button>
    </div>
  );
};
