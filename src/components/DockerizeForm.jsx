/* eslint-disable no-unused-vars */

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types'; // Importez PropTypes depuis la bibliothèque prop-types
import axios from 'axios';
import FormData from "form-data";
// import "./App.css";

/* eslint-disable react/display-name */
const DockerizeForm = forwardRef(({ framework, projectUrl, gitlabUrl, containerPort, deploymentEnvironment }, ref) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false); // State pour gérer l'affichage de "En attente..."

    const handleDockerizeForm = async (event) => {
        const apiUrl = import.meta.env.VITE_APP_API_URL;

        let data = new FormData();
        data.append('framework', framework);
        data.append('project_url', projectUrl);
        data.append('gitlab_url', gitlabUrl);
        data.append('container_port', containerPort);
        data.append('deployment_environment', deploymentEnvironment);

        let config = {
            method: 'post',
            url: `${apiUrl}dockerize`,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: data
        };

        try {
            setLoading(true); // Activer le chargement "En attente..."
            const response = await axios(config);
            setResponse(JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Désactiver le chargement une fois l'exécution terminée
        }
    };

    useImperativeHandle(ref, () => ({
        handleDockerizeForm
    }));

    return (
        <header >
            <form onSubmit={handleDockerizeForm}>
            </form>
            {loading && <h4>En attente... dockerize en cours</h4>}
            {response && <h4><pre>{response}</pre></h4>}
        </header>
    );

});

// Ajoutez la validation des props
DockerizeForm.propTypes = {
    framework: PropTypes.string.isRequired,
    projectUrl: PropTypes.string.isRequired,
    gitlabUrl: PropTypes.string.isRequired,
    containerPort: PropTypes.string.isRequired,
    deploymentEnvironment: PropTypes.string.isRequired
};

export default DockerizeForm;

