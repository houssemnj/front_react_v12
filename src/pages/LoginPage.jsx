// // src/pages/LoginPage.jsx
// import React from 'react';
// import LoginForm from '../components/LoginForm';
// import { Route, Routes } from 'react-router-dom';

// const LoginPage = () => {
//     return (
//         <Routes>
//             <Route path="/" element={<LoginForm />} />
//         </Routes>
//     );
// };

// export default LoginPage; 

// src/pages/LoginPage.jsx
import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import LoginForm from '../components/LoginForm';
import './LoginPage.css'; // Import a CSS file for custom styles
import myimage from "./logos-neopolis-dev-site-refont-1.webp";

const { Title } = Typography;

const LoginPage = () => {
    return (
        <Row justify="center" align="middle" className="login-page">
            <Col xs={24} sm={12} md={8} lg={6}>
                <Card className="login-card" bordered={false}>
                    <div className="login-header">
                        {/* Replace with your logo */}
                        <img src={myimage} alt="Company Logo" className="login-logo" />
                        <Title level={2} className="login-title">Login</Title>
                    </div>
                    <LoginForm />
                </Card>
            </Col>
        </Row>
    );
};

export default LoginPage;
