import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import { Layout as AntdLayout, Menu, Breadcrumb, Avatar } from 'antd';

import './style.less';
import {
  routerConfig,
  RouterConfig,
  routerConfigFlattenDeep,
} from 'src/routes';
import { Home } from 'src/pages/Home';
import { NotFound } from 'src/pages/NotFound';

const { Header, Sider, Content, Footer } = AntdLayout;

interface P {}
interface S {
  collapsed: boolean;
  selectedKeys: string[];
  openKeys: string[];
}

/**
 * @description 页面整体布局入口
 * @author wudajian
 * @date 2022/04/13
 * @export
 * @class Layout
 * @extends {React.PureComponent<P, S>}
 */
export class Layout extends React.PureComponent<P, S> {
  public state = {
    collapsed: true,
    ...Layout.getOpensAndSelectedKeys(),
  };

  public static getOpensAndSelectedKeys = () => {
    return {
      selectedKeys: [location.hash.split('#')[1]],
      openKeys: routerConfigFlattenDeep
        .filter((i) => location.hash.includes(i.path))
        .map((i) => i.path),
    };
  };

  public render() {
    const { collapsed, selectedKeys, openKeys } = this.state;

    return (
      <AntdLayout>
        <Header>
          <Avatar src='https://joeschmoe.io/api/v1/random' />
        </Header>
        <AntdLayout>
          <Sider
            theme='light'
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed: boolean) => this.setState({ collapsed })}
          >
            <Menu
              theme='light'
              mode='inline'
              onSelect={({ selectedKeys }) => this.setState({ selectedKeys })}
              onOpenChange={(openKeys) => this.setState({ openKeys })}
              selectedKeys={selectedKeys}
              openKeys={openKeys}
            >
              {this.renderMenuItems(routerConfig)}
            </Menu>
          </Sider>
          <AntdLayout>
            <Breadcrumb>
              <Breadcrumb.Item
                key='home'
                onClick={() => this.setState(Layout.getOpensAndSelectedKeys())}
              >
                <Link to='/home'>Home</Link>
              </Breadcrumb.Item>
              {this.renderBreadcrumbItems()}
            </Breadcrumb>
            <Content>
              <Routes>
                <Route index element={<Home />} />
                {this.renderRoutes(routerConfig)}
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Content>
          </AntdLayout>
        </AntdLayout>
        <Footer>React Web Created by wudajian</Footer>
      </AntdLayout>
    );
  }

  private renderMenuItems(routerConfig: RouterConfig[]) {
    return routerConfig.map((i) => {
      if (i.children?.length) {
        return (
          <Menu.SubMenu key={i.path} title={i.title} icon={i.icon}>
            {this.renderMenuItems(i.children)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item key={i.path} icon={i.icon}>
            <Link to={i.path}>{i.title}</Link>
          </Menu.Item>
        );
      }
    });
  }

  private renderRoutes(routerConfig: RouterConfig[]) {
    return routerConfig.map((i) => {
      if (i.children?.length) {
        return (
          <Route key={i.path} path={i.path}>
            {this.renderRoutes(i.children)}
          </Route>
        );
      } else {
        return <Route key={i.path} path={i.path} element={i.element} />;
      }
    });
  }

  private renderBreadcrumbItems() {
    const pathSnippets = location.hash.split('/').filter((i) => i !== '#');

    return pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const item = routerConfigFlattenDeep.find((i) => i.path === url);

      if (item) {
        return (
          <Breadcrumb.Item key={url}>
            {item.children?.length ? (
              item.title
            ) : (
              <Link to={url}>{item.title}</Link>
            )}
          </Breadcrumb.Item>
        );
      } else {
        return null;
      }
    });
  }
}
