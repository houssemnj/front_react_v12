// import React from 'react';
// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import { Link, Outlet } from 'react-router-dom';
// const { Header, Content, Footer } = Layout;

// const items = [
//   {
//     key: '1',
//     label: <Link to='demande'>Demande de mise en production</Link>
//   },
//   {
//     key: '2',
//     label: <Link to='reponse'>Reponses de mes demandes</Link>
//   },
//   {
//     key: '3',
//     label: <Link to='check-collection'>Check Collection</Link>
//   }
// ]

// const MainLayout = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   return (
//     <Layout>
//       <Header
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//         }}
//       >
//         <div className="demo-logo" />
//         <Menu
//           theme="dark"
//           mode="horizontal"
//           defaultSelectedKeys={['2']}
//           items={items}
//           style={{
//             flex: 1,
//             minWidth: 0,
//           }}
//         />
//       </Header>
//       <Content
//         style={{
//           padding: '24px 48px',
//         }}
//       >
//         <div
//           style={{
//             background: colorBgContainer,
//             minHeight: 880,
//             padding: 24,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           <Outlet />
//         </div>
//       </Content>
//       <Footer
//         style={{
//           textAlign: 'center',
//         }}
//       >
//         Ant Design ©{new Date().getFullYear()} Created by Ant UED
//       </Footer>
//     </Layout>
//   );
// };
// export default MainLayout;

import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { UserOutlined, LogoutOutlined, DeploymentUnitOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

const menuItems = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: <Link to='/demande'>Demande de mise en production</Link>,
  },
  {
    key: '2',
    icon: <UserOutlined />,
    label: <Link to='/reponse'>Reponses de mes demandes</Link>,
  },
  {
    key: '3',
    icon: <UserOutlined />,
    label: <Link to='/check-collection'>Check Collection</Link>,
  },
  {
    key: '4',
    icon: <DeploymentUnitOutlined />,
    label: <Link to='/deploiement'>Deploiement</Link>,
  },
  {
    key: '5',
    icon: <UserOutlined />,
    label: <Link to='/Check-MOA'>MOA test</Link>,
  },
];

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the authentication token
    navigate('/login'); // Redirect to the login page
  };

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={menuItems}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ backgroundColor: 'red', borderColor: 'red' }}
        >
          Logout
        </Button>
      </Header>
      <Content
        style={{
          padding: '24px 48px',
        }}
      >
        <div
          className="site-layout-content"
          style={{ margin: '100px auto', maxWidth: '960px' }}
        >
          <Outlet />
        </div>
      </Content>

    </Layout>
  );
};

export default MainLayout;
