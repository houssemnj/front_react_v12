/* eslint-disable no-unused-vars */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types'; // Importez PropTypes depuis la bibliothèque prop-types
import axios from 'axios';
import FormData from "form-data";
import "./../App.css";

/* eslint-disable react/display-name */
const CreatepipelineForm = forwardRef(({ projectUrl , gitlabUrl, jenkinsUrl , jenkinsUsername , sonarUrl , branchName ,credentialsId }, ref) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false); // State pour gérer l'affichage de "En attente..."
  
    const handleCreatepipelineForm = async (event) => {
        const apiUrl = import.meta.env.VITE_APP_API_URL;
    
        let data = new FormData();
        data.append('project_url', projectUrl);
        data.append('gitlab_url', gitlabUrl);
        data.append('sonar_url', sonarUrl);
        data.append('jenkins_url', jenkinsUrl);
        data.append('jenkins_username', jenkinsUsername);
        data.append('branchName', branchName);
        data.append('credentialsId', credentialsId);
    
        let config = {
            method: 'post',
            url: `${apiUrl}create_pipelinee`,
            headers: { 
                'Content-Type': 'multipart/form-data'
            },
            data : data
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
        handleCreatepipelineForm
    }));
    return (
        <header>
            <form onSubmit={handleCreatepipelineForm}>        
            </form>
            {loading && <h4>En attente... Build en cours</h4>}
            {response && <h4><pre>{response}</pre></h4>}

        </header>
    );
});

// Ajoutez la validation des props
CreatepipelineForm.propTypes = {
    projectUrl: PropTypes.string.isRequired,
    gitlabUrl: PropTypes.string.isRequired,
    jenkinsUrl: PropTypes.string.isRequired,
    jenkinsUsername: PropTypes.string.isRequired,
    sonarUrl: PropTypes.string.isRequired,
    branchName: PropTypes.string.isRequired,
    credentialsId: PropTypes.string.isRequired
};

export default CreatepipelineForm;


