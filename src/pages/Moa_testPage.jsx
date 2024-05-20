import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Moa_test from '../components/Moa_test';

const Moa_testPage = () => {
    return (
        <Routes>
            <Route path="/" element={<Moa_test />} />
        </Routes>
    );
};

export default Moa_testPage;