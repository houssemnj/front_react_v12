/* eslint-disable no-unused-vars */

import React, { useState, useRef } from 'react';
import DockerizeForm from './DockerizeForm';
import CreatepipelineForm from './CreatepipelineForm';
import ConsoleOutputForm from './ConsoleOutputForm';
import ProxyForm from './proxyForm';
// import "./App.css";
import "./modal.css";

function App() {
    const [framework, setframework] = useState('');
    const [projectUrl, setProjectUrl] = useState('');
    const [gitlabUrl, setgitlabtUrl] = useState('');
    const [containerPort, setcontainerPort] = useState('');
    const [deploymentEnvironment, setdeploymentEnvironment] = useState('');
    const [jenkinsUrl, setJenkinsUrl] = useState('');
    const [jenkinsUsername, setJenkinsUsername] = useState('');
    const [sonarUrl, setsonarUrl] = useState('');
    const [branchName, setBranchName] = useState('');
    const [credentialsId, setCredentialsId] = useState('');
    const [sitename, setSiteName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dockerizeFormRef = useRef();
    const createpipelineFormRef = useRef();
    const proxyFormRef = useRef();
    const consoleOutputFormRef = useRef();

    const handleStart = () => {
        if (
            !framework ||
            !projectUrl ||
            !gitlabUrl ||
            !containerPort ||
            !deploymentEnvironment ||
            !jenkinsUrl ||
            !jenkinsUsername ||
            !sonarUrl ||
            !branchName ||
            !credentialsId ||
            !sitename
        ) {
            setErrorMessage("Veuillez saisir toutes les valeurs.");
            return;
        }
        // Assuming handleSubmit is properly defined to return a Promise
        dockerizeFormRef.current.handleDockerizeForm(framework, projectUrl, gitlabUrl, containerPort, deploymentEnvironment)
            .then(() => createpipelineFormRef.current.handleCreatepipelineForm(projectUrl, gitlabUrl, jenkinsUrl, jenkinsUsername, sonarUrl, branchName, credentialsId))
            .then(() => consoleOutputFormRef.current.fetchConsoleOutput())
            .then(() => proxyFormRef.current.handleproxyForm(sitename))
            .then(() => setErrorMessage(''))// Fonction vide ajoutée ici
            .catch((error) => console.error(error));
    };

    const handleInputChange = (e, setterFunction) => {
        setterFunction(e.target.value);
        if (errorMessage) {
            setErrorMessage('');
        }
    };

    return (
        <div className="main">
            <div>
                <label>
                    Project URL:
                    <input
                        type="text"
                        value={projectUrl}
                        onChange={(e) => handleInputChange(e, setProjectUrl)}
                    />
                </label>
                <label>
                    gitlab URL:
                    <input
                        type="text"
                        value={gitlabUrl}
                        onChange={(e) => handleInputChange(e, setgitlabtUrl)}
                    />
                </label>
                <label>
                    Jenkins URL: {/* New input for Jenkins URL */}
                    <input
                        type="text"
                        value={jenkinsUrl}
                        onChange={(e) => handleInputChange(e, setJenkinsUrl)}
                    />
                </label>
                <label>
                    Sonar URL:
                    <input type="text"
                        value={sonarUrl}
                        onChange={(e) => handleInputChange(e, setsonarUrl)} />
                </label>
                <label> {/* New label and input for Jenkins Username */}
                    Jenkins Username:
                    <input
                        type="text"
                        value={jenkinsUsername}
                        onChange={(e) => handleInputChange(e, setJenkinsUsername)}
                    />
                </label>
                <label>
                    Branch Name:
                    <input type="text" value={branchName} onChange={(e) => handleInputChange(e, setBranchName)} />
                </label>
                <label>
                    Credentials ID:
                    <input type="text" value={credentialsId} onChange={(e) => handleInputChange(e, setCredentialsId)} />
                </label>
                <label>
                    Framework:
                    <select value={framework} onChange={(e) => handleInputChange(e, setframework)}>
                        <option value="">-- Sélectionnez un framework --</option>
                        <option value="flask">flask</option>
                        <option value="react">react</option>
                        <option value="express">express</option>
                    </select>
                </label>

                <label>
                    Container Port:
                    <input type="text" value={containerPort} onChange={(e) => handleInputChange(e, setcontainerPort)} />
                </label>

                <label>
                    Deployment Environment:
                    <input type="text" value={deploymentEnvironment} onChange={(e) => handleInputChange(e, setdeploymentEnvironment)} />
                </label>
                <label>
                    Site Name:
                    <input type="text" value={sitename} onChange={(e) => handleInputChange(e, setSiteName)} />
                </label>
                <button onClick={handleStart}>Start</button>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}


            <DockerizeForm
                ref={dockerizeFormRef}
                framework={framework}
                projectUrl={projectUrl}
                gitlabUrl={gitlabUrl}
                containerPort={containerPort}
                deploymentEnvironment={deploymentEnvironment}
            />
            <CreatepipelineForm
                ref={createpipelineFormRef}
                projectUrl={projectUrl}
                gitlabUrl={gitlabUrl}
                jenkinsUrl={jenkinsUrl}
                jenkinsUsername={jenkinsUsername}
                sonarUrl={sonarUrl}
                branchName={branchName}
                credentialsId={credentialsId}
            />
            <ProxyForm
                ref={proxyFormRef}
                sitename={sitename}
            />
            <ConsoleOutputForm
                ref={consoleOutputFormRef}
                projectUrl={projectUrl}
                gitlabUrl={gitlabUrl}
                jenkinsUrl={jenkinsUrl}
                jenkinsUsername={jenkinsUsername}
            />
        </div>
    );
}

export default App;




