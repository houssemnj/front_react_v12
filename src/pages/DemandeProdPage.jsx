import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DemandeProdForm from '../components/DemandeProdForm';

const DemandeProdPage = () => {
    return (
        <Routes>
            <Route path="/" element={<DemandeProdForm />} />
        </Routes>
    );
};

export default DemandeProdPage;
