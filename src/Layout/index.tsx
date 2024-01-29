import React from 'react';
import { Switch, Route, Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Layout as AntdLayout, Menu, Breadcrumb, Avatar } from 'antd';
import { GitlabOutlined, Html5Outlined } from '@ant-design/icons';

import './style.less';
import { routerConfig, RouterConfig, findDeep, flattenDeep } from '../routes';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';

const { Header, Sider, Content, Footer } = AntdLayout;

interface P extends RouteComponentProps {}
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
class Layout extends React.PureComponent<P, S> {
  public historyListen: any;

  public getFindDeepResult = () => {
    const hashResult = location.hash.split('#')[1];
    const findDeepResult = findDeep(routerConfig, hashResult);

    if (findDeepResult) {
      return {
        id: hashResult,
        item: findDeepResult,
      };
    }
  };

  public getOpenAndSelectedKeys = () => {
    const result = this.getFindDeepResult();

    if (result) {
      return {
        selectedKeys: [result.id],
        openKeys: flattenDeep([result.item], false).map((i) => i.path),
      };
    } else {
      return {
        selectedKeys: [],
        openKeys: [],
      };
    }
  };

  public state = {
    collapsed: false,
    ...this.getOpenAndSelectedKeys(),
  };

  public componentDidMount(): void {
    const { history } = this.props;

    this.historyListen = history.listen((location) => {
      // console.log('路由变化：', location);

      this.setState((prev) => ({
        ...prev,
        ...this.getOpenAndSelectedKeys(),
      }));
    });
  }

  public componentWillUnmount(): void {
    this.historyListen && this.historyListen();
  }

  public render() {
    const { collapsed, selectedKeys, openKeys } = this.state;

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
              onSelect={({ selectedKeys }) =>
                this.setState({ selectedKeys: selectedKeys as string[] })
              }
              onOpenChange={(openKeys) => this.setState({ openKeys: openKeys as string[] })}
              selectedKeys={selectedKeys}
              openKeys={openKeys}
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
              <Switch>
                <Route path='/' exact component={Home} />
                {this.renderRoutes(routerConfig)}
                <Route path='*' component={NotFound} />
              </Switch>
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
        return <Route key={route.path} path={route.path} component={route.component} />;
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

export default withRouter(Layout) as any;
