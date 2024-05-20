/* eslint-disable no-unused-vars */

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types'; // Importez PropTypes depuis la bibliothèque prop-types
import axios from 'axios';
import FormData from "form-data";
// import "./App.css";

/* eslint-disable react/display-name */

const ProxyForm = forwardRef(({ sitename }, ref) => {
    const [response, setResponse] = useState(null);

    const handleproxyForm = async (event) => {
        const apiUrl = import.meta.env.VITE_APP_API_URL;

        let data = new FormData();
        data.append('site_name', sitename);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${apiUrl}proxy`,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: data
        };

        try {
            const response = await axios(config);
            setResponse(JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        }
    };

    useImperativeHandle(ref, () => ({
        handleproxyForm
    }));
    return (
        <header>
            <form onSubmit={handleproxyForm}>
            </form>
            <h4><pre>{response}</pre></h4>
        </header>
    );
});

// Ajoutez la validation des props
ProxyForm.propTypes = {
    sitename: PropTypes.string.isRequired
};

export default ProxyForm;
