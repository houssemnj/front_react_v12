import React, { useState, forwardRef, useEffect, useImperativeHandle } from 'react';
import FormData from 'form-data';
import axios from 'axios';
import { Modal } from 'antd';
import './modal.css';
import './StageView.css'; // Import the CSS

const StageViewForm = forwardRef(({ projectUrl, jenkinsUrl, jenkinsUsername, gitService }, ref) => {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Function to fetch stage view
  const fetchStageView = async () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    let data = new FormData();
    data.append('jenkins_url', jenkinsUrl);
    data.append('jenkins_username', jenkinsUsername);
    data.append('project_url', projectUrl);
    data.append('git_service', gitService);

    let config = {
      method: 'post',
      url: `${apiUrl}/get_stage_view`, // Ensure the URL is correct
      headers: { 
        'Content-Type': 'multipart/form-data'
      },
      data: data
    };

    try {
      const response = await axios(config);
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(response.data, 'text/html');
      const stageElements = htmlDoc.getElementsByClassName('stage');
      const stages = Array.from(stageElements).map(stageElement => {
        const name = stageElement.getElementsByTagName('h2')[0].textContent;
        const status = stageElement.getElementsByTagName('p')[0].textContent.split(': ')[1];
        return { name, status };
      });
      setStages(stages);
      setLoading(false);
      clearInterval(intervalId);
    } catch (error) {
      console.error('Error fetching stage view:', error);
    }
  };

  // useEffect to handle component mounting and unmounting
  // useEffect to handle component mounting
useEffect(() => {
  setLoading(true);
  fetchStageView().then(() => {
    setLoading(false);
  });
}, []); // Empty dependency array to run only once on mount


  // handleSubmit function that returns a promise
  const handleSubmit = () => {
    setLoading(true);
    const newIntervalId = setInterval(fetchStageView, 1000);
    setIntervalId(newIntervalId);
  };

  // Expose handleSubmit to parent components
  useImperativeHandle(ref, () => ({
    handleSubmit
  }));

  // Toggle modal visibility
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  // Render the component
  return (
    <div>
      
      <form onSubmit={handleSubmit} disabled={loading}>
      </form>
      
        {loading ? <p>  </p> : (
          <div className="stage-view">
            {stages.map((stage, index) => (
              <div key={index} className={`stage stage-${stage.status.toLowerCase()}`}>
                <h2>{stage.name}</h2>
                <p>Status: {stage.status}</p>
              </div>
            ))}
          </div>
        )}
      
    </div>
  );
});

export default StageViewForm;



// import React, { useState, forwardRef, useImperativeHandle } from 'react';
// import axios from 'axios';
// import FormData from "form-data";
// import { Modal } from 'antd';
// import "./modal.css"

// const StageViewForm = forwardRef(({ projectUrl, jenkinsUrl, jenkinsUsername }, ref) => {
//   const [stageViewHtml, setStageViewHtml] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [intervalId, setIntervalId] = useState(null);

//   const fetchStageView = async () => {
//     const apiUrl = import.meta.env.VITE_APP_API_URL;
//     let data = new FormData();
//     data.append('jenkins_url', jenkinsUrl);
//     data.append('jenkins_username', jenkinsUsername);
//     data.append('project_url', projectUrl);

//     let config = {
//       method: 'post',
//       url: `${apiUrl}/get_stage_view`,
//       headers: { 
//         'Content-Type': 'multipart/form-data'
//       },
//       data: data
//     };

//     try {
//       const response = await axios(config);
//       setStageViewHtml(response.data); // Set the HTML content
//       setLoading(false);
//       clearInterval(intervalId);
//     } catch (error) {
//       console.error('Error fetching stage view:', error);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault(); // Prevent default form submission
//     setLoading(true);
//     const newIntervalId = setInterval(fetchStageView, 1000);
//     setIntervalId(newIntervalId);
//   };

//   useImperativeHandle(ref, () => ({
//     handleSubmit
//   }));

//   const handleToggleModal = () => {
//     setShowModal(!showModal);
//   };

//   return (
//     <div>
//       <button onClick={handleToggleModal}>
//         {showModal ? 'Hide Stage View' : 'Show Stage View'}
//       </button>
      
//       <Modal 
//         className='modal'
//         title="Stage View"
//         open={showModal}
//         onCancel={handleToggleModal}
//         footer={null}
//         theme="dark"
//       >
//         {loading ? <p>Loading stage view...</p> : (
//           <div dangerouslySetInnerHTML={{ __html: stageViewHtml }} />
//         )}
//       </Modal>
//     </div>
//   );
// });

// export default StageViewForm;



// import React, { useState, forwardRef, useImperativeHandle } from 'react';
// import axios from 'axios';
// import FormData from "form-data";
// import { Modal } from 'antd'; // Import the Modal component
// import "./modal.css"

// const StageViewForm = forwardRef(({ projectUrl, jenkinsUrl, jenkinsUsername }, ref) => {
//   const [stageView, setStageView] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility
//   const [intervalId, setIntervalId] = useState(null);

//   const fetchStageView = async () => {
//     const apiUrl = import.meta.env.VITE_APP_API_URL;
//     let data = new FormData();
//     data.append('jenkins_url', jenkinsUrl);
//     data.append('jenkins_username', jenkinsUsername);
//     data.append('project_url', projectUrl);

//     let config = {
//       method: 'post',
//       url: `${apiUrl}get_stage_view`,
//       headers: { 
//         'Content-Type': 'multipart/form-data'
//       },
//       data: data
//     };

//     try {
//       const response = await axios(config);
//       setStageView(JSON.stringify(response.data, null, 2));
//       setLoading(false);
//       clearInterval(intervalId);
//     } catch (error) {
//       console.error('Error fetching stage view:', error);
//     }
//   };

//   const handleSubmit = () => {
//     setLoading(true);
//     const newIntervalId = setInterval(fetchStageView, 1000);
//     setIntervalId(newIntervalId);
//   };

//   useImperativeHandle(ref, () => ({
//     handleSubmit
//   }));

//   const handleToggleModal = () => {
//     setShowModal(!showModal);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit} disabled={loading}>
//       </form>
//       <br></br>
//       <button onClick={handleToggleModal}>
//         {showModal ? 'Hide Stage View' : 'Show Stage View'}
//       </button>
      
//       <Modal 
//         className='modal'
//         title="Stage View"
//         open={showModal}
//         onCancel={handleToggleModal}
//         footer={null}
//         theme="dark"
//       >
//         {loading ? <p>Loading stage view...</p> : <pre>{stageView}</pre>}
//       </Modal>
//     </div>
//   );
// });

// export default StageViewForm;
