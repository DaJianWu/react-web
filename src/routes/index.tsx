import React from 'react';
import { RouteProps } from 'react-router-dom';
import { MenuItemProps } from 'antd';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';

import { Home } from 'src/pages/Home';
import { Page1 } from 'src/pages/page1';

export interface RouterConfig extends RouteProps, MenuItemProps {
  children?: RouterConfig[];
  breadcrumbName: string;
  path: string;
}

/**
 * 路由配置
 */
export const routerConfig: RouterConfig[] = [
  {
    title: '首页',
    breadcrumbName: '首页',
    icon: <DesktopOutlined />,
    path: '/home',
    element: <Home />,
  },
  {
    title: '页面',
    breadcrumbName: '页面',
    icon: <PieChartOutlined />,
    path: '/page',
    children: [
      {
        title: '页面1',
        breadcrumbName: '页面1',
        path: '/page/1',
        element: <Page1 />,
      },
    ],
  },
];

/**
 * @description 把路由配置扁平化为一维数组
 * @param originData
 * @returns routerConfigFlattenDeep
 */
export const flattenDeep = (originData = routerConfig) => {
  const routerConfigFlattenDeep: RouterConfig[] = [];

  const loop = (data = originData) => {
    data.forEach((i) => {
      if (i.children?.length) {
        routerConfigFlattenDeep.push(i);
        loop(i.children);
      } else {
        routerConfigFlattenDeep.push(i);
      }
    });
  };
  loop();

  return routerConfigFlattenDeep;
};

export const routerConfigFlattenDeep = flattenDeep();

// export const find = (key: string, data: RouterConfig[]) => {
//   for (let index = 0; index < data.length; index++) {
//     const item = data[index];

//     if (item.children?.length) {
//       return find(key, item.children);
//     } else {
//       if (item.path === key) {
//         return item;
//       } else {
//         return undefined;
//       }
//     }
//   }
// };
