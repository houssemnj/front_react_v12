import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Reponse from '../components/Reponse';

const ReponsePage = () => {
    return (
        <Routes>
            <Route path="/" element={<Reponse />} />
        </Routes>
    );
};

export default ReponsePage;