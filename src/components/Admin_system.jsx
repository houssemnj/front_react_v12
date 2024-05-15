
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./../App2.css";

// axios.defaults.baseURL = 'http://localhost:5001';

const Admin_system = () => {
    const [newObjects, setNewObjects] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [projectUrl, setProjectUrl] = useState('');
    const [projectLeader, setProjectLeader] = useState('');
    const [action, setAction] = useState('');
    const [refusalReason, setRefusalReason] = useState('');
    const [refusalInputFor, setRefusalInputFor] = useState(null); // ID de l'objet pour lequel afficher le champ de saisie
    const [currentDetailId, setCurrentDetailId] = useState(null); // ID de la demande actuellement affichée dans le modal
    const [message, setMessage] = useState(''); // Message indiquant le nombre de nouvelles demandes
    const [isInputVisible, setIsInputVisible] = useState(false);

    useEffect(() => {

        const savedDemands = JSON.parse(localStorage.getItem('newObjects')) || [];

        setNewObjects(savedDemands);
        axios.get('http://localhost:5001/check_collection')
            .then(response => {
                if (response.data && response.data.new_objects) {
                    // Marquer les nouvelles demandes et ajouter un timestamp
                    const newDemands = response.data.new_objects.map(demand => ({
                        ...demand,
                        isNew: true,
                        timestamp: Date.now()
                    }));
                    const combinedDemands = [...newDemands, ...savedDemands];
                    setNewObjects(response.data.new_objects);
                    localStorage.setItem('newObjects', JSON.stringify(combinedDemands)); // Sauvegarder dans localStorage
                    toast.info(`Il y a ${response.data.new_objects.length} nouvelles demandes.`);
                    setMessage(`Il y a ${response.data.new_objects.length} nouvelles demandes.`);
                }
            })
            .catch(error => console.error(error));
    }, []);

    const sortedDemands = newObjects.sort((a, b) => b.isNew - a.isNew || b.timestamp - a.timestamp);
    const handleShowDetails = (detailId) => {
        setCurrentDetailId(detailId); // Afficher le modal pour cette demande
        setRefusalInputFor(null); // Réinitialiser le champ de saisie de refus
    };


    const handleCloseModal = () => {
        setCurrentDetailId(null); // Fermer le modal
    };

    const getCurrentDetail = () => {
        // Trouver l'objet par son ID. Si non trouvé, retourner null.
        return newObjects.find(obj => obj._id === currentDetailId) || null;
    };

    const handleApprove = (_id) => {
        axios.post('http://localhost:5002/stocker', { _id: _id, message: 'Demande approuvée' })
            .then(() => {
                // Supprimer l'objet approuvé du tableau
                const updatedObjects = newObjects.filter(obj => obj._id !== _id);
                setNewObjects(updatedObjects);
                localStorage.setItem('newObjects', JSON.stringify(updatedObjects));
            })
            .catch(error => console.error(error));
    };

    const handleRefuse = (_id) => {
        setRefusalInputFor(_id); // Afficher le champ de saisie pour cet ID
    };

    const handleSendRefusal = (_id) => {
        if (refusalReason !== '') {
            axios.post('http://localhost:5002/stocker', { _id: _id, message: 'Demande refusée: ' + refusalReason })
                .then(() => {
                    setRefusalReason('');
                    setRefusalInputFor(null); // Masquer le champ de saisie
                    // Supprimer l'objet refusé du tableau
                    const updatedObjects = newObjects.filter(obj => obj._id !== _id);
                    setNewObjects(updatedObjects);
                    localStorage.setItem('newObjects', JSON.stringify(updatedObjects));
                })
                .catch(error => console.error(error));
        }
    };

    const handleAction = (selectedAction) => {
        // Si l'action sélectionnée est la même que celle en cours et que les champs sont visibles, les cacher
        if (action === selectedAction && isInputVisible) {
            setIsInputVisible(false);
            setAction('');
        } else {
            // Sinon, afficher les champs et définir l'action
            setIsInputVisible(true);
            setAction(selectedAction);
        }
    };

    const handleActionSubmit = () => {
        switch (action) {
            case 'add':
                handleAddProject();
                break;
            case 'delete':
                handleDeleteProject();
                break;
            case 'modify':
                handleModifyProject();
                break;
            default:
                break;
        }
    };

    const handleAddProject = () => {
        axios.post('http://localhost:5001/ajouter_projet', { project_url: projectUrl, project_leader: projectLeader })
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    const handleDeleteProject = () => {
        axios.post('http://localhost:5001/supprimer_projet', { project_url: projectUrl })
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    const handleModifyProject = () => {
        axios.post('http://localhost:5001/modifier_projet', { project_url: projectUrl, project_leader: projectLeader })
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <div className='admin-container'>

            <div className="admin-ations">
                <h1> Gestion de la base </h1>
                <div>
                    <button onClick={() => handleAction('add')}>Ajouter Projet</button>
                    {action === 'add' && isInputVisible &&(
                        <>
                            <label> <br />
                                URL du projet:
                                <input type="text" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} />
                            </label>
                            <label>
                                Chef de projet:
                                <input type="text" value={projectLeader} onChange={e => setProjectLeader(e.target.value)} />
                            </label>
                            <button onClick={handleActionSubmit} disabled={!projectUrl || !projectLeader}>Envoyer</button>
                        </>
                    )}
                </div>
                <div>
                    <button onClick={() => handleAction('delete')}>Supprimer Projet</button>
                    {action === 'delete' && isInputVisible &&(
                        <>
                            <label> <br />
                                URL du projet:
                                <input type="text" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} />
                            </label>
                            <button onClick={handleActionSubmit} disabled={!projectUrl}>Envoyer</button>
                        </>
                    )}
                </div>
                <div>
                    <button onClick={() => handleAction('modify')}>Modifier Projet</button>
                    {action === 'modify' && isInputVisible &&(
                        <>
                            <label> <br />
                                URL du projet:
                                <input type="text" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} />
                            </label>
                            <label>
                                Chef de projet:
                                <input type="text" value={projectLeader} onChange={e => setProjectLeader(e.target.value)} />
                            </label>
                            <button onClick={handleActionSubmit} disabled={!projectUrl || !projectLeader}>Envoyer</button>
                        </>
                    )}
                </div>
            </div>
            <div className="admin-notifications">
                <ToastContainer position="top-right" autoClose={5000} />
                <h3>Gestion des demandes de prod</h3>
                <p>{message}</p>
                {sortedDemands.map((object, index) => (
                    <div key={object._id}>
                        {/* Afficher le titre "Demandes non traitées" avant la première demande non nouvelle */}
                        {index === 0 || (index > 0 && !sortedDemands[index - 1].isNew && object.isNew) ? (
                            <h3>{object.isNew ? 'Nouvelles demandes' : 'Demandes non traitées'}</h3>
                        ) : null}
                        <p>Nom du projet: {object.nom}</p>
                        <button onClick={() => handleShowDetails(object._id)}>Voir détails</button>
                    </div>
                ))}
                {currentDetailId && getCurrentDetail() && ( // S'assurer que getCurrentDetail() ne retourne pas null
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleCloseModal}>×</span>
                            <h2>Détails de la demande</h2>
                            {Object.entries(getCurrentDetail()).map(([key, value]) => (
                                <p key={key}><strong>{key}:</strong> {value}</p>
                            ))}
                            <button onClick={() => handleApprove(currentDetailId)}>Approuver</button>
                            <button onClick={() => handleRefuse(currentDetailId)}>Refuser</button>
                            {refusalInputFor === currentDetailId && (
                                <div>
                                    <input type="text" value={refusalReason} onChange={e => setRefusalReason(e.target.value)} placeholder="Motif de refus" />
                                    <button onClick={() => handleSendRefusal(currentDetailId)}>Envoyer</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin_system;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "./../App2.css";

// // axios.defaults.baseURL = 'http://localhost:5001';

// const Admin_system = () => {
//     const [newObjects, setNewObjects] = useState([]);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [projectUrl, setProjectUrl] = useState('');
//     const [projectLeader, setProjectLeader] = useState('');
//     const [action, setAction] = useState('');
//     const [refusalReason, setRefusalReason] = useState('');
//     const [refusalInputFor, setRefusalInputFor] = useState(null); // ID de l'objet pour lequel afficher le champ de saisie
//     const [currentDetailId, setCurrentDetailId] = useState(null); // ID de la demande actuellement affichée dans le modal
//     const [message, setMessage] = useState(''); // Message indiquant le nombre de nouvelles demandes

//     useEffect(() => {
//         axios.get('http://localhost:5001/check_collection')
//             .then(response => {
//                 if (response.data && response.data.new_objects) {
//                     setNewObjects(response.data.new_objects);
//                     toast.info(`Il y a ${response.data.new_objects.length} nouvelles demandes.`);
//                     setMessage(`Il y a ${response.data.new_objects.length} nouvelles demandes.`);
//                 }
//             })
//             .catch(error => console.error(error));
//     }, []);

//     const handleShowDetails = (detailId) => {
//         setCurrentDetailId(detailId); // Afficher le modal pour cette demande
//         setRefusalInputFor(null); // Réinitialiser le champ de saisie de refus
//     };


//     const handleCloseModal = () => {
//         setCurrentDetailId(null); // Fermer le modal
//     };

//     const getCurrentDetail = () => {
//         // Trouver l'objet par son ID. Si non trouvé, retourner null.
//         return newObjects.find(obj => obj._id === currentDetailId) || null;
//     };

//     const handleApprove = (_id) => {
//         axios.post('http://localhost:5002/stocker', { _id: _id, message: 'Demande approuvée' })
//             .then(() => {
//                 // Supprimer l'objet approuvé du tableau
//                 setNewObjects(newObjects.filter(obj => obj._id !== _id));
//             })
//             .catch(error => console.error(error));
//     };

//     const handleRefuse = (_id) => {
//         setRefusalInputFor(_id); // Afficher le champ de saisie pour cet ID
//     };

//     const handleSendRefusal = (_id) => {
//         if (refusalReason !== '') {
//             axios.post('http://localhost:5002/stocker', { _id: _id, message: 'Demande refusée: ' + refusalReason })
//                 .then(() => {
//                     setRefusalReason('');
//                     setRefusalInputFor(null); // Masquer le champ de saisie
//                     // Supprimer l'objet refusé du tableau
//                     setNewObjects(newObjects.filter(obj => obj._id !== _id));
//                 })
//                 .catch(error => console.error(error));
//         }
//     };

//     const handleAction = (selectedAction) => {
//         setAction(selectedAction);
//     };

//     const handleActionSubmit = () => {
//         switch (action) {
//             case 'add':
//                 handleAddProject();
//                 break;
//             case 'delete':
//                 handleDeleteProject();
//                 break;
//             case 'modify':
//                 handleModifyProject();
//                 break;
//             default:
//                 break;
//         }
//     };

//     const handleAddProject = () => {
//         axios.post('http://localhost:5001/ajouter_projet', { project_url: projectUrl, project_leader: projectLeader })
//             .then(response => console.log(response.data))
//             .catch(error => console.error(error));
//     };

//     const handleDeleteProject = () => {
//         axios.post('http://localhost:5001/supprimer_projet', { project_url: projectUrl })
//             .then(response => console.log(response.data))
//             .catch(error => console.error(error));
//     };

//     const handleModifyProject = () => {
//         axios.post('http://localhost:5001/modifier_projet', { project_url: projectUrl, project_leader: projectLeader })
//             .then(response => console.log(response.data))
//             .catch(error => console.error(error));
//     };

//     const toggleModal = () => {
//         setModalVisible(!modalVisible);
//     };

//     return (
//         <div className='admin-container'>

//             <div className="admin-ations">
//             <h1> Gestion de la base </h1>
//             <div>
//                 <button onClick={() => handleAction('add')}>Ajouter Projet</button>
//                 {action === 'add' && (
//                     <>
//                         <label>
//                             URL du projet:
//                             <input type="text" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} />
//                         </label>
//                         <label>
//                             Chef de projet:
//                             <input type="text" value={projectLeader} onChange={e => setProjectLeader(e.target.value)} />
//                         </label>
//                         <button onClick={handleActionSubmit}>Envoyer</button>
//                     </>
//                 )}
//             </div>
//             <div>
//                 <button onClick={() => handleAction('delete')}>Supprimer Projet</button>
//                 {action === 'delete' && (
//                     <>
//                         <label>
//                             URL du projet:
//                             <input type="text" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} />
//                         </label>
//                         <button onClick={handleActionSubmit}>Envoyer</button>
//                     </>
//                 )}
//             </div>
//             <div>
//                 <button onClick={() => handleAction('modify')}>Modifier Projet</button>
//                 {action === 'modify' && (
//                     <>
//                         <label>
//                             URL du projet:
//                             <input type="text" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} />
//                         </label>
//                         <label>
//                             Chef de projet:
//                             <input type="text" value={projectLeader} onChange={e => setProjectLeader(e.target.value)} />
//                         </label>
//                         <button onClick={handleActionSubmit}>Envoyer</button>
//                     </>
//                 )}
//             </div>
//             </div>
//             <div className="admin-notifications">
//                 <ToastContainer position="top-right" autoClose={5000} />
//                 <p>{message}</p>
//                 {newObjects.map((object) => (
//                     <div key={object._id}>
//                         <p>Nom du projet: {object.nom}</p>
//                         <button onClick={() => handleShowDetails(object._id)}>Voir détails</button>
//                     </div>
//                 ))}
//                 {currentDetailId && getCurrentDetail() && ( // S'assurer que getCurrentDetail() ne retourne pas null
//                     <div className="modal">
//                         <div className="modal-content">
//                             <span className="close" onClick={handleCloseModal}>×</span>
//                             <h2>Détails de la demande</h2>
//                             {Object.entries(getCurrentDetail()).map(([key, value]) => (
//                                 <p key={key}><strong>{key}:</strong> {value}</p>
//                             ))}
//                             <button onClick={() => handleApprove(currentDetailId)}>Approuver</button>
//                             <button onClick={() => handleRefuse(currentDetailId)}>Refuser</button>
//                             {refusalInputFor === currentDetailId && (
//                                 <div>
//                                     <input type="text" value={refusalReason} onChange={e => setRefusalReason(e.target.value)} placeholder="Motif de refus" />
//                                     <button onClick={() => handleSendRefusal(currentDetailId)}>Envoyer</button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Admin_system;










