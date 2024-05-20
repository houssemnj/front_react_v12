// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/LoginForm';
import { Route, Routes } from 'react-router-dom';

const LoginPage = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginForm />} />
        </Routes>
    );
};

export default LoginPage; 