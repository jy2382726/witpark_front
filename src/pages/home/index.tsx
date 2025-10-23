import React, { useState } from 'react';
import MySider from '../../components/sider';
import MyBreadcrumb from '../../components/breadcrumb';
import MyHeader from '../../components/header';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  // 从主题中获取背景颜色和圆角半径
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <MySider />
      </Sider>
      <Layout>
        <Header style={{ paddingRight: '20px', background: colorBgContainer, textAlign: 'right' }} >
          <MyHeader />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <MyBreadcrumb />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;