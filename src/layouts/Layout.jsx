import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

const items = [
  {
    key: '1',
    label: <Link to='demande'>Demande de mise en production</Link>
  },
  {
    key: '2',
    label: <Link to='reponse'>Reponses de mes demandes</Link>
  },
  {
    key: '3',
    label: <Link to='check-collection'>Check Collection</Link>
  }
]

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '24px 48px',
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 880,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default MainLayout;