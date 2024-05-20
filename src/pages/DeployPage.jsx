import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../components/Deploy';

const DeployPage = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
        </Routes>
    );
};

export default DeployPage;