import React, { useState, useRef } from "react";

import "./Apps.css";

import ConsoleOutputForm from "./ConsoleOutputForm";
import DockerizeForm from "./DockerizeForm";
import CreatePipelineForm from "./CreatePipelineForm";
import ProxyForm from "./ProxyForm";
import StageViewForm from "./StageViewForm";




//import "antd/dist/antd.css";

function App() {

  const [projectUrl, setProjectUrl] = useState("");
  const [jenkinsUrl, setJenkinsUrl] = useState(""); // New state for Jenkins URL
  const [jenkinsUsername, setJenkinsUsername] = useState("");
  const [branchName, setBranchName] = useState("");
  const [credentialsId, setCredentialsId] = useState("");
  const [sonar_url, setSonarUrl] = useState("");
  const [framework, setFramework] = useState("");
  const [containerPort, setContainerPort] = useState("");
  const [deploymentEnvironment, setDeploymentEnvironment] = useState("");
  const [site_name, setSiteName] = useState("");
  const [gitService , setGitService] = useState("")

  const dockerizeFormRef = useRef();
  const createPipelineFormRef = useRef();
  const proxyFormRef = useRef();
  const consoleOutputFormRef = useRef();
  const StageViewFormRef = useRef();

  const handleStart = () => {
    const mockEvent = { preventDefault: () => {} };
    // Assuming handleSubmit is properly defined to return a Promise
    dockerizeFormRef.current
      .handleSubmit(mockEvent)
      .then(() =>
        consoleOutputFormRef.current.handleSubmit(
          projectUrl,
          jenkinsUrl,
          jenkinsUsername
        )
      )
      .then(() =>
        StageViewFormRef.current.handleSubmit(
          projectUrl,
          jenkinsUrl,
          jenkinsUsername
        )
      )
      .then(() => createPipelineFormRef.current.handleSubmit(mockEvent))

      .then(() => proxyFormRef.current.handleSubmit(mockEvent))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
     
      
        <div className="main">
          <fieldset>
            <legend className="section-title">Main Form</legend>
            <label>
              Git service:
              <select
                value={gitService}
                onChange={(e) => setGitService(e.target.value)}
              >
                <option>select Git service</option>
                <option value="gitlab">gitlab</option>
                <option value="github">github</option>
              </select>
            </label>
            <label>
              Project URL:
              <input
                type="text"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
              />
            </label>
            <label>
              Jenkins URL: {/* New input for Jenkins URL */}
              <input
                type="text"
                value={jenkinsUrl}
                onChange={(e) => setJenkinsUrl(e.target.value)}
              />
            </label>
            <label>
              Sonar URL:
              <input
                type="text"
                value={sonar_url}
                onChange={(e) => setSonarUrl(e.target.value)}
              />
            </label>
            <label>
              {" "}
              {/* New label and input for Jenkins Username */}
              Jenkins Username:
              <input
                type="text"
                value={jenkinsUsername}
                onChange={(e) => setJenkinsUsername(e.target.value)}
              />
            </label>
            <label>
              Branch Name:
              <input
                type="text"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
              />
            </label>
            <label>
              Credentials ID:
              <input
                type="text"
                value={credentialsId}
                onChange={(e) => setCredentialsId(e.target.value)}
              />
            </label>
            <label>
              Framework:
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
              >
                <option>select framework</option>
                <option value="flask">flask</option>
                <option value="react">react</option>
              </select>
            </label>
            <label>
              Container Port:
              <input
                type="text"
                value={containerPort}
                onChange={(e) => setContainerPort(e.target.value)}
              />
            </label>
            <label>
              Deployment Environment:
              <input
                type="text"
                value={deploymentEnvironment}
                onChange={(e) => setDeploymentEnvironment(e.target.value)}
              />
            </label>
            <label>
              Site Name:
              <input
                type="text"
                value={site_name}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </label>
            <br></br>
            <button onClick={handleStart}>Start</button>s
            <ConsoleOutputForm
              ref={consoleOutputFormRef}
              projectUrl={projectUrl}
              jenkinsUrl={jenkinsUrl}
              jenkinsUsername={jenkinsUsername}
              gitService={gitService}
            />
          </fieldset>
        </div>
        <div className="right-container">
          <div className="main3">
            <fieldset>
              <legend className="section-title">Progress View</legend>
              <DockerizeForm
                ref={dockerizeFormRef}
                projectUrl={projectUrl}
                framework={framework}
                containerPort={containerPort}
                deploymentEnvironment={deploymentEnvironment}
                gitService={gitService}

              />
              <CreatePipelineForm
                ref={createPipelineFormRef}
                projectUrl={projectUrl}
                jenkinsUrl={jenkinsUrl}
                jenkinsUsername={jenkinsUsername}
                sonar_url={sonar_url}
                branchName={branchName}
                credentialsId={credentialsId}
                gitService={gitService}
              />
              <ProxyForm ref={proxyFormRef} site_name={site_name} />
            </fieldset>
          </div>
          <div className="main2">
            <fieldset>
              <legend className="section-title">Stage View</legend>
              <StageViewForm
                ref={StageViewFormRef}
                projectUrl={projectUrl}
                jenkinsUrl={jenkinsUrl}
                jenkinsUsername={jenkinsUsername}
                gitService={gitService}
              />
            </fieldset>
          </div>
        </div>
      </div>
      
    
  );
}

export default App;

// import React, { useState, useRef } from 'react';
// import "./App.css";
// import ConsoleOutputForm from './ConsoleOutputForm';
// import DockerizeForm from './DockerizeForm';
// import CreatePipelineForm from './CreatePipelineForm';
// import ProxyForm from './ProxyForm';

// function App() {
//   const [projectUrl, setProjectUrl] = useState('');
//   const dockerizeFormRef = useRef();
//   const createPipelineFormRef = useRef();
//   const proxyFormRef = useRef();
//   const consoleOutputFormRef = useRef();

//   const handleStart = () => {
//     // Assuming handleSubmit is properly defined to return a Promise
//     dockerizeFormRef.current.handleSubmit(projectUrl).then(() =>
//       createPipelineFormRef.current.handleSubmit(projectUrl)).then(() =>
//         proxyFormRef.current.handleSubmit(projectUrl)).catch((error) =>
//           console.error(error));
//   };

//   return (
//     <div>
//       <label>
//         Project URL:
//         <input
//           type="text"
//           value={projectUrl}
//           onChange={e => setProjectUrl(e.target.value)}
//         />
//       </label>

//       <button onClick={handleStart}>Start</button>
//       <DockerizeForm ref={dockerizeFormRef} projectUrl={projectUrl} />
//       <CreatePipelineForm ref={createPipelineFormRef} projectUrl={projectUrl} />
//       <ProxyForm ref={proxyFormRef} projectUrl={projectUrl} />
//       <ConsoleOutputForm ref={consoleOutputFormRef} projectUrl={projectUrl} />
//     </div>
//   );
// }

// export default App;

// import React, { useRef } from 'react';
// import "./App.css";
// import ConsoleOutputForm from './ConsoleOutputForm';
// import DockerizeForm from './DockerizeForm';
// import CreatePipelineForm from './CreatePipelineForm';
// import ProxyForm from './ProxyForm';

// function App() {
//   const dockerizeFormRef = useRef();
//   const createPipelineFormRef = useRef();
//   const proxyFormRef = useRef();
//   const ConsoleOutputFormRef = useRef();

//   const handleStart = () => {

//     dockerizeFormRef.current.handleSubmit().then(() =>
//       createPipelineFormRef.current.handleSubmit()).then(() =>
//         proxyFormRef.current.handleSubmit()).catch((error) =>
//           console.error(error));
//   };

//   return (
//     <div>
//       <button onClick={handleStart}>Start</button>
//       <DockerizeForm ref={dockerizeFormRef} />
//       <CreatePipelineForm ref={createPipelineFormRef} />
//       <ProxyForm ref={proxyFormRef} />
//       <ConsoleOutputForm ref={ConsoleOutputFormRef} />
//     </div>
//   );
// }

// export default App;