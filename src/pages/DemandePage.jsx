import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Demande from '../components/Demande';

const DemandePage = () => {
    return (
        <Routes>
            <Route path="/" element={<Demande />} />
        </Routes>
    );
};

export default DemandePage;