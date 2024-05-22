// import React, { useState, forwardRef, useImperativeHandle , useRef} from 'react';
// import axios from 'axios';
// import FormData from "form-data";
// import "./App.css";
// import ProxyForm from './ProxyForm';

// const ConsoleOutputForm = forwardRef(({ projectUrl , jenkinsUrl , jenkinsUsername }, ref) => {
//     const [consoleOutput, setConsoleOutput] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [showOutput, setShowOutput] = useState(false); 
//     const [intervalId, setIntervalId] = useState(null);
//     const [proxyFunctionStarted, setProxyFunctionStarted] = useState(false); // Add this state

//     const fetchConsoleOutput = async () => {
//       if (proxyFunctionStarted) {
//         clearInterval(intervalId);
//         return;
//       }

//       const apiUrl = import.meta.env.VITE_APP_API_URL;
  
//       let data = new FormData();
//       data.append('jenkins_url', jenkinsUrl);
//       data.append('jenkins_username', jenkinsUsername);
//       data.append('project_url', projectUrl);
      
//       let config = {
//         method: 'post',
//         url: `${apiUrl}get_console_output`,
//         headers: { 
//           'Content-Type': 'multipart/form-data'
//         },
//         data: data
//       };
  
//       try {
//         const response = await axios(config);
//         setConsoleOutput(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching console output:', error);
//       }
//     };
  
//     const handleSubmit = () => {
//       setLoading(true);
//       const newIntervalId = setInterval(fetchConsoleOutput, 1000);
//       setIntervalId(newIntervalId);
//     };
  
//     useImperativeHandle(ref, () => ({
//       handleSubmit
//     }));
  
//     const handleToggleOutput = () => {
//       setShowOutput(!showOutput);
//     };

//     const proxyFunction = () => {
//       // Your proxy function code here
//       setProxyFunctionStarted(true);
//     };

//     return (
//       <header>
//         <form onSubmit={handleSubmit} disabled={loading}>
//         </form>
//         <br></br>
//         <button onClick={handleToggleOutput}>
//           {showOutput ? 'Hide Console Output' : 'Show Console Output'}
//         </button>
//         {loading ? <p>Loading console output...</p> : (showOutput && <h4><pre>{consoleOutput}</pre></h4>)}
//       </header>
//     );
//   });

// export default ConsoleOutputForm;



// import React, { useState, forwardRef, useImperativeHandle , useRef} from 'react';
// import axios from 'axios';
// import FormData from "form-data";
// import "./App.css";



// const ConsoleOutputForm = forwardRef(({ projectUrl , jenkinsUrl , jenkinsUsername }, ref) => {
//     const [consoleOutput, setConsoleOutput] = useState('');
//     // const [jenkinsUrl, setJenkinsUrl] = useState('');
//     // const [jenkinsUsername, setJenkinsUsername] = useState('');
//     // const [projectUrl, setProjectUrl] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [showOutput, setShowOutput] = useState(false); 
//     const [intervalId, setIntervalId] = useState(null);
    
    
  
//     const fetchConsoleOutput = async (event) => {
  
//       const apiUrl = import.meta.env.VITE_APP_API_URL;
  
//       let data = new FormData();
//       data.append('jenkins_url', jenkinsUrl);
//       data.append('jenkins_username', jenkinsUsername);
//       data.append('project_url', projectUrl);
      
  
//       let config = {
//         method: 'post',
//         url: `${apiUrl}get_console_output`,
//         headers: { 
//           'Content-Type': 'multipart/form-data'
//         },
//         data: data
//       };
  
//       try {
//         const response = await axios(config);
//         setConsoleOutput(response.data);
//         setLoading(false);
//         clearInterval(intervalId);
//       } catch (error) {
//         console.error('Error fetching console output:', error);
//       }
//     };
  
  
//     const handleSubmit = (event) => {
//       // event.preventDefault();
//       setLoading(true);
//       // Set a new interval
//       const newIntervalId = setInterval(fetchConsoleOutput, 1000);
//       setIntervalId(newIntervalId);
//     };
  
//     useImperativeHandle(ref, () => ({
//       handleSubmit
//     }));
  
//     const handleToggleOutput = () => {
//       setShowOutput(!showOutput); // Toggle the display of the console output
//     };

    
  
//     return (
//       <header>
//         <form onSubmit={handleSubmit} disabled={loading}>
//         </form>
//         <br></br>
//         <button onClick={handleToggleOutput}>
//           {showOutput ? 'Hide Console Output' : 'Show Console Output'}
//         </button>
//         {loading ? <p>Loading console output...</p> : (showOutput && <h4><pre>{consoleOutput}</pre></h4>)}
//       </header>
//     );
//   });


//   export default ConsoleOutputForm ;
  



import React, { useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import FormData from "form-data";
import { Modal } from 'antd'; // Import the Modal component
// import "./App.css";
import "./modal.css"

//import 'bootstrap/dist/css/bootstrap.min.css';





const ConsoleOutputForm = forwardRef(({ projectUrl, jenkinsUrl, jenkinsUsername ,gitService }, ref) => {
  const [consoleOutput, setConsoleOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [intervalId, setIntervalId] = useState(null);

  const fetchConsoleOutput = async () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    let data = new FormData();
    data.append('jenkins_url', jenkinsUrl);
    data.append('jenkins_username', jenkinsUsername);
    data.append('project_url', projectUrl);
    data.append('git_service', gitService);

    let config = {
      method: 'post',
      url: `${apiUrl}get_console_output`,
      headers: { 
        'Content-Type': 'multipart/form-data'
      },
      data: data
    };

    try {
      const response = await axios(config);
      setConsoleOutput(response.data);
      setLoading(false);
      clearInterval(intervalId);
    } catch (error) {
      console.error('Error fetching console output:', error);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const newIntervalId = setInterval(fetchConsoleOutput, 1000);
    setIntervalId(newIntervalId);
  };

  useImperativeHandle(ref, () => ({
    handleSubmit
  }));

  const handleToggleModal = () => {
    //console.log('Toggling modal'); // Log when the modal is being toggled
    setShowModal(!showModal);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} disabled={loading}>
      </form>
      <br></br>
      <button onClick={handleToggleModal}>
        {showModal ? 'Hide Console Output' : 'Show Console Output'}
      </button>
      
      <Modal 
        
        className='modal'
        title="Console Output"
        open={showModal}
        onCancel={handleToggleModal}
        footer={null}
        theme="dark"
      >
        {loading ? <p>Loading console output...</p> : <pre>{consoleOutput}</pre>}
      </Modal>
    </div>
  );
});

export default ConsoleOutputForm;
