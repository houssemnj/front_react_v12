import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin_system from '../components/Admin_system';

const Admin_systemPage = () => {
    return (
        <Routes>
            <Route path="/" element={<Admin_system />} />
        </Routes>
    );
};

export default Admin_systemPage;
