// import React from 'react';
// import { Layout, Menu, Button } from 'antd';
// import { Link, useNavigate, Outlet } from 'react-router-dom';
// import { UserOutlined, LogoutOutlined, DeploymentUnitOutlined } from '@ant-design/icons';

// const { Header, Content } = Layout;

// const menuItems = [
//   {
//     key: '1',
//     icon: <UserOutlined />,
//     label: <Link to='/demande'>Demande de mise en production</Link>,
//   },
//   {
//     key: '2',
//     icon: <UserOutlined />,
//     label: <Link to='/reponse'>Reponses de mes demandes</Link>,
//   },
//   {
//     key: '3',
//     icon: <UserOutlined />,
//     label: <Link to='/check-collection'>Check Collection</Link>,
//   },
//   {
//     key: '4',
//     icon: <DeploymentUnitOutlined />,
//     label: <Link to='/deploiement'>Deploiement</Link>,
//   },
//   {
//     key: '5',
//     icon: <UserOutlined />,
//     label: <Link to='/Check-MOA'>MOA test</Link>,
//   },
//   {
//     key: '6',
//     icon: <UserOutlined />,
//     label: <Link to='/suivie_d_etat'>Suivie d'etat</Link>,
//   },
// ];

// const MainLayout = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('authToken'); // Clear the authentication token
//     navigate('/login'); // Redirect to the login page
//   };

//   return (
//     <Layout>
//       <Header
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}
//       >
//         <div className="demo-logo" />
//         <Menu
//           theme="dark"
//           mode="horizontal"
//           defaultSelectedKeys={['2']}
//           items={menuItems}
//           style={{
//             flex: 1,
//             minWidth: 0,
//           }}
//         />
//         <Button
//           type="primary"
//           icon={<LogoutOutlined />}
//           onClick={handleLogout}
//           style={{ backgroundColor: 'red', borderColor: 'red' }}
//         >
//           Logout
//         </Button>
//       </Header>
//       <Content
//         style={{
//           padding: '24px 48px',
//         }}
//       >
//         <div
//           className="site-layout-content"
//           style={{ margin: '100px auto', maxWidth: '960px' }}
//         >
//           <Outlet />
//         </div>
//       </Content>

//     </Layout>
//   );
// };

// export default MainLayout;

import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import {

  LogoutOutlined,
  DeploymentUnitOutlined,
  SolutionOutlined,
  AppstoreAddOutlined,
  AuditOutlined,
  InboxOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import myimage from "./logos-neopolis-dev-site-refont-1.webp";
import "./layout.css";

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const menuItems = [
    {
      key: "/demande",
      icon: <AppstoreAddOutlined />,
      label: <Link to="/demande">Demande de mise en production</Link>,
    },
    {
      key: "/reponse",
      icon: <InboxOutlined />,
      label: <Link to="/reponse">Reponses de mes demandes</Link>,
    },
    {
      key: "/check-collection",
      icon: <SolutionOutlined />,
      label: <Link to="/check-collection">Check Collection</Link>,
    },
    {
      key: "/deploiement",
      icon: <DeploymentUnitOutlined />,
      label: <Link to="/deploiement">Deploiement</Link>,
    },
    {
      key: "/Check-MOA",
      icon: <AuditOutlined />,
      label: <Link to="/Check-MOA">MOA test</Link>,
    },
    {
      key: '/suivie_d_etat',
      icon: <ProjectOutlined />,
      label: <Link to='/suivie_d_etat'>Suivie d'etat</Link>,
    },
  ];

  const selectedKeys = [location.pathname];

  return (
    <Layout style={{ minHeight: '100vh', fontFamily: "'Poppins', sans-serif" }} >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={300}
        className="site-layout-background rounded-sider"
      >
        <div className="logo" style={{ padding: "16px", textAlign: "center" }}>
          <img src={myimage} alt="Company Logo" style={{ maxWidth: "100%" }} />
        </div>
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          mode="inline"
          items={menuItems}
        />
        {/* Place the logout button outside the Menu component */}
        <div
          className={`logout-container logout-hover ${collapsed ? "collapsed" : ""
            }`}
          style={{
            position: "absolute",
            bottom: "60px",
            left: collapsed ? "0" : "10px", // Adjust left space based on collapsed state
            right: collapsed ? "0" : "10px", // Adjust right space based on collapsed state
            padding: "10px",
            display: "flex", // Ensure the items are aligned horizontally
            justifyContent: "center", // Center the items when collapsed
          }}
        >
          <div
            onClick={handleLogout}
            style={{
              cursor: "pointer",
              color: "white",
              backgroundColor: "red",
              textAlign: "center",
              borderRadius: "8px",
              padding: collapsed ? "10px" : "10px 20px", // Adjust padding based on collapsed state
              display: "flex", // Use flex to align icon and text
              alignItems: "center", // Center align items vertically
            }}
          >
            <LogoutOutlined style={{ marginRight: collapsed ? "0" : "8px" }} />{" "}
            {/* Adjust margin based on collapsed state */}
            {!collapsed && "Logout"}{" "}
            {/* Conditionally render the text based on collapsed state */}
          </div>
        </div>
      </Sider>
      <Layout style={{ maxHeight: '100vh' }} >
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f9f9f9",
            padding: "0 20px", // Add horizontal padding to match the Sider's margin
            marginTop: "20px", // Add top margin to match the Sider
            marginRight: "20px",
            borderRadius: "20px", // Apply border radius to match the Sider
            height: "64px", // Optional: specify a height for the Header
            overflow: 'auto',
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <img src={myimage} alt="Company Logo" style={{ maxHeight: "100%" }} />
        </Header>
        <Content
          style={{
            padding: "0 20px", // Add horizontal padding to match the Sider's margin
            marginTop: "20px", // Add top margin to match the Sider
            marginRight: "20px",
            marginBottom: "20px",
            background: "#f9f9f9",
            borderRadius: "20px",
            overflow: "auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {" "}
          {/* Add top margin and border radius to match the Sider */}
          <div style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
