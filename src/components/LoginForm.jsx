// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { message, Form, Input, Checkbox, Button, Typography } from 'antd';
// import { LockOutlined, MailOutlined } from '@ant-design/icons';
// import './../App.css';

// const { Title, Text } = Typography;

// const LoginForm = () => {
//     const navigate = useNavigate();

//     const onFinish = async (values) => {
//         try {
//             const response = await fetch('https://dev.ws.neo-link.neopolis-dev.com/api/auth/login', {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     email: values.email, // Use 'email' instead of 'username'
//                     password: values.password,
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Login failed');
//             }

//             const data = await response.json();
//             localStorage.setItem('authToken', data.token); // Save the token to localStorage
//             message.success('Login successful!');
//             navigate('/demande'); // Navigate to a protected route after login
//         } catch (error) {
//             console.error(error);
//             message.error(error.message);
//         }
//     };

//     return (
//         <section className="login-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
//             <div className="login-container" style={{ width: '380px' }}>
//                 <div className="login-header" style={{ marginBottom: '24px', textAlign: 'center' }}>

//                     <Title level={2}>Sign in</Title>
//                     <Text style={{ display: 'block', marginBottom: '24px' }}>
//                         Welcome back! Please enter your details below to sign in.
//                     </Text>
//                 </div>
//                 <Form
//                     name="normal_login"
//                     initialValues={{ remember: true }}
//                     onFinish={onFinish}
//                     layout="vertical"
//                     className="login-form"
//                 >
//                     <Form.Item
//                         name="email"
//                         rules={[{ type: "email", required: true, message: "Please input your Email!" }]}
//                     >
//                         <Input prefix={<MailOutlined />} placeholder="Email" />
//                     </Form.Item>
//                     <Form.Item
//                         name="password"
//                         rules={[{ required: true, message: "Please input your Password!" }]}
//                     >
//                         <Input.Password prefix={<LockOutlined />} placeholder="Password" />
//                     </Form.Item>

//                     <Form.Item>
//                         <Button type="primary" htmlType="submit" block>
//                             Log in
//                         </Button>
//                     </Form.Item>
//                     <Form.Item style={{ textAlign: 'center' }}>

//                     </Form.Item>
//                 </Form>
//             </div>
//         </section>
//     );
// };

// export default LoginForm;


import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false); // Move this inside the component
    const navigate = useNavigate();

    useEffect(() => {
        if (loginSuccess) {
            const role = localStorage.getItem('userRole');
            // Redirect the user to the appropriate page based on their role
            switch (role) {
                case 'team_lead':
                    navigate('/demande');
                    break;
                case 'developer':
                    navigate('/reponse');
                    break;
                case 'admin':
                    navigate('/check-collection');
                    break;
                case 'amoa':
                    navigate('/Check-MOA');
                    break;
                default:
                    navigate('/'); // Default redirect if the role is not recognized
            }
        }
    }, [loginSuccess, navigate]);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.patch('http://localhost:5003/api/auth/login', values);
            const { token, role } = response.data;

            localStorage.setItem('authToken', token);
            localStorage.setItem('userRole', role);

            message.success('Login successful!');
            setLoading(false);
            setLoginSuccess(true); // Set login success state to trigger the useEffect hook
        } catch (error) {
            if (error.response) {
                message.error(error.response.data.message);
            } else {
                message.error('Login failed. Please try again later.');
            }
            setLoading(false);
        }
    };
    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Log In
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;