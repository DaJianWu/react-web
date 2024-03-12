import React from 'react';
import { Result, Button } from 'antd';

/**
 * @description 404页面
 * @author wudajian
 * @date 2022/06/08
 * @returns React.FC
 */
export const NotFound: React.FC = () => {
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='link' href='/#/home'>
          Back Home
        </Button>
      }
    />
  );
};
