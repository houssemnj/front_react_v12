import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SuivieDEtat from '../components/SuivieDEtat';

const SuiviePage = () => {
    return (
        <Routes>
            <Route path="/" element={<SuivieDEtat />} />
        </Routes>
    );
};

export default SuiviePage;