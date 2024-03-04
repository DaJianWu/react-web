import React from 'react';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';

import type { RouteProps } from 'react-router-dom';
import type { MenuItemProps } from 'antd/lib/menu/MenuItem';

import { Home } from 'src/pages/Home';
import { Page1 } from 'src/pages/Page1';

export interface RouterConfig {
  path: string;
  element?: React.ReactNode;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  children?: RouterConfig[];
}

/**
 * 路由配置
 */
export const routerConfig: RouterConfig[] = [
  {
    title: '首页',
    icon: <DesktopOutlined />,
    path: '/home',
    element: <Home />,
  },
  {
    title: '页面',
    icon: <PieChartOutlined />,
    path: '/page',
    children: [
      {
        title: '页面1',
        path: '/page/1',
        element: <Page1 />,
      },
    ],
  },
];

/**
 * @description 把树级节点扁平化为一维数组
 * @param nodes 节点数据
 * @param isChildNode 是否包含末级节点
 * @returns flattenData
 */
export function flattenDeep(nodes: RouterConfig[] = routerConfig, isChildNode: boolean = true) {
  const flattenData: RouterConfig[] = [];

  (function loop(data: RouterConfig[]) {
    data.forEach((i) => {
      if (i.children?.length) {
        flattenData.push(i);

        loop(i.children);
      } else {
        if (isChildNode) {
          flattenData.push(i);
        }
      }
    });
  })(nodes);

  return flattenData;
}

/**
 * @description 根据 ID 深度查找树级节点
 * @param nodes 节点数据
 * @param id 目标节点ID
 * @returns 包含目标节点及其相关的父级节点
 */
export function findDeep(nodes: RouterConfig[], id: RouterConfig['path']): RouterConfig | null {
  for (const node of nodes) {
    if (node.path === id) {
      return node;
    }

    if (node.children) {
      const result = findDeep(node.children, id);

      if (result !== null) {
        return {
          ...node,
          children: [result],
        };
      }
    }
  }

  return null;
}
