import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout as AntdLayout, Menu, Breadcrumb, Avatar } from 'antd';
import { GitlabOutlined, Html5Outlined } from '@ant-design/icons';

import './style.less';
import { routerConfig, RouterConfig, findDeep, flattenDeep } from '../routes';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';

const { Header, Sider, Content, Footer } = AntdLayout;

interface P { }
interface S {
  collapsed: boolean;
}

/**
 * @description 页面整体布局入口
 * @author wudajian
 * @date 2022/04/13
 * @export
 * @class Layout
 * @extends {React.PureComponent<P, S>}
 */
class Layout extends React.PureComponent<P, S> {
  public state = {
    collapsed: false,
  };

  public getFindDeepResult = () => {
    const hashResult = window.location.hash.split('#')[1];
    const findDeepResult = findDeep(routerConfig, hashResult);

    if (findDeepResult) {
      return {
        id: hashResult,
        item: findDeepResult,
      };
    }
  };

  public getDefaultKeys = () => {
    const result = this.getFindDeepResult();

    if (!result) {
      return {
        selectedKeys: [],
        openKeys: [],
      };
    }

    return {
      selectedKeys: [result.id],
      openKeys: flattenDeep([result.item], false).map((i) => i.path),
    };
  };

  public render() {
    const { collapsed } = this.state;
    const { selectedKeys, openKeys } = this.getDefaultKeys();

    console.log(selectedKeys, openKeys);

    return (
      <AntdLayout>
        <Header>
          <Avatar src='https://joeschmoe.io/api/v1/random' />
          <a href='http://www.wudajian.xyz' target='_blank' rel='noreferrer'>
            Destiny 的个人首页
          </a>
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
              defaultSelectedKeys={selectedKeys}
              defaultOpenKeys={openKeys}
            >
              {this.renderMenuItems(routerConfig)}
            </Menu>
          </Sider>
          <AntdLayout>
            <Breadcrumb>
              <Breadcrumb.Item key='home'>
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
    return routerConfig.map((route) => {
      if (route.children?.length) {
        return (
          <Menu.SubMenu key={route.path} title={route.title} icon={route.icon}>
            {this.renderMenuItems(route.children)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item key={route.path} icon={route.icon}>
            <Link to={route.path}>{route.title}</Link>
          </Menu.Item>
        );
      }
    });
  }

  private renderRoutes(routerConfig: RouterConfig[]) {
    return routerConfig.map((route) => {
      if (route.children?.length) {
        return (
          <Route key={route.path} path={route.path}>
            {this.renderRoutes(route.children)}
          </Route>
        );
      } else {
        return <Route key={route.path} path={route.path} element={route.element} />;
      }
    });
  }

  private renderBreadcrumbItems() {
    const result = this.getFindDeepResult();

    if (result) {
      return flattenDeep([result.item], true).map((route) => (
        <Breadcrumb.Item key={route.path}>
          {route.children?.length ? route.title : <Link to={route.path}>{route.title}</Link>}
        </Breadcrumb.Item>
      ));
    }
  }
}

export default Layout;
