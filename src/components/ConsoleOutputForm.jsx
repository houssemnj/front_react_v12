
/* eslint-disable no-unused-vars */

import React, { useState, forwardRef, useEffect, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import FormData from "form-data";
import { Modal, Button } from 'antd';
import "./../App.css";
import "./modal.css";

/* eslint-disable react/display-name */

const ConsoleOutputForm = forwardRef(({ projectUrl, gitlabUrl, jenkinsUrl, jenkinsUsername }, ref) => {
    const [consoleOutput, setConsoleOutput] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchConsoleOutput = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_APP_API_URL;
            const data = new FormData();
            data.append('jenkins_url', jenkinsUrl);
            data.append('jenkins_username', jenkinsUsername);
            data.append('project_url', projectUrl);
            data.append('gitlab_url', gitlabUrl);

            const config = {
                method: 'POST',
                url: `${apiUrl}log`,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: data
            };

            const response = await axios(config);
            setConsoleOutput(response.data);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching console output:', error);
        } finally {
            setLoading(false);
        }
    };

    useImperativeHandle(ref, () => ({
        fetchConsoleOutput
    }));

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (consoleOutput) {
            setShowModal(true);
        }
    }, [consoleOutput]);

    return (
        <div>
            <button onClick={fetchConsoleOutput} disabled={loading}>
                {loading ? "Chargement..." : "Afficher console"}
            </button>
            {showModal && (
                <Modal
                    title="Console Output"
                    visible={showModal}
                    onCancel={handleCloseModal}
                    footer={[
                        <Button key="refresh" onClick={fetchConsoleOutput}>
                            Rafraîchir
                        </Button>,
                        <Button key="back" onClick={handleCloseModal}>
                            Fermer
                        </Button>
                    ]}
                    className="custom-modal" // Ajoutez cette classe pour appliquer les styles personnalisés
                >
                    <pre>{consoleOutput}</pre>
                </Modal>

            )}
        </div>
    );
});

ConsoleOutputForm.propTypes = {
    projectUrl: PropTypes.string.isRequired,
    gitlabUrl: PropTypes.string.isRequired,
    jenkinsUrl: PropTypes.string.isRequired,
    jenkinsUsername: PropTypes.string.isRequired
};

export default ConsoleOutputForm;




// /* eslint-disable no-unused-vars */

// import React, { useState, forwardRef, useEffect, useImperativeHandle } from 'react';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// import FormData from "form-data";
// import { Modal, Button } from 'antd';
// // import 'antd/dist/antd.css';
// import "./App.css";
// // import "./modal.css";



// /* eslint-disable react/display-name */

// const ConsoleOutputForm = forwardRef(({ projectUrl, jenkinsUrl, jenkinsUsername }, ref) => {
//     const [consoleOutput, setConsoleOutput] = useState('');
//     const [showModal, setShowModal] = useState(false);

//     const fetchConsoleOutput = async () => {
//         try {
//             const apiUrl = import.meta.env.VITE_APP_API_URL;
//             const data = new FormData();
//             data.append('jenkins_url', jenkinsUrl);
//             data.append('jenkins_username', jenkinsUsername);
//             data.append('project_url', projectUrl);

//             const config = {
//                 method: 'POST',
//                 url: `${apiUrl}log`,
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 data: data
//             };

//             const response = await axios(config);
//             setConsoleOutput(response.data);
//             setShowModal(true);
//         } catch (error) {
//             console.error('Error fetching console output:', error);
//         }
//     };

//     useImperativeHandle(ref, () => ({
//         fetchConsoleOutput
//     }));

//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     useEffect(() => {
//         if (consoleOutput) {
//             setShowModal(true);
//         }
//     }, [consoleOutput]);

//     return (
//         <>
//             <button onClick={fetchConsoleOutput}>Afficher console</button>
//           <Modal
//               title="Console Output"
//               visible={showModal}
//               onCancel={handleCloseModal}
//               footer={[
//                   <Button key="refresh" onClick={fetchConsoleOutput}>
//                       Refresh
//                   </Button>,
//                   <Button key="back" onClick={handleCloseModal}>
//                       Fermer
//                   </Button>
//               ]}
//               className="custom-modal" // Ajoutez une classe personnalisée
//           >
//               <pre className="console-output">{consoleOutput}</pre>
//           </Modal>

//         </>
//     );
// });

// ConsoleOutputForm.propTypes = {
//     projectUrl: PropTypes.string.isRequired,
//     jenkinsUrl: PropTypes.string.isRequired,
//     jenkinsUsername: PropTypes.string.isRequired
// };

// export default ConsoleOutputForm;

