// import React, { useState, useEffect } from 'react';
// import axios from 'axios'
// import "./../App.css";


// // Configuration d'Axios pour pointer vers l'URL de votre serveur Flask
// // axios.defaults.baseURL = 'http://localhost:5002'; // Remplacez par l'URL de votre serveur Flask

// function DemandeProdForm() {
//     const [projets, setProjets] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [projectName, setProjectName] = useState('');
//     const [projectLeader, setProjectLeader] = useState('');
//     const [projectUrl, setProjectUrl] = useState('');
//     const [projectTag, setProjectTag] = useState('');
//     const [releaseNote, setReleaseNote] = useState('');
//     const [valide0, setValide0] = useState(false);
//     const [valide1, setValide1] = useState(false);
//     const [valide2, setValide2] = useState(false);
//     const [valide3, setValide3] = useState(false);
//     const [formSubmitted, setFormSubmitted] = useState(false);
//     const [details, setDetails] = useState([]);
//     useEffect(() => {
//         axios.get('http://localhost:5002/get_projets')
//             .then(response => {
//                 setProjets(response.data);
//             })
//             .catch(error => {
//                 console.error('Erreur lors de la récupération des projets:', error);
//             });

//         axios.get('http://localhost:5002/get_users')
//             .then(response => {
//                 setUsers(response.data);
//             })
//             .catch(error => {
//                 console.error('Erreur lors de la récupération des utilisateurs:', error);
//             });

//         axios.get('http://localhost:5002/traiter')
//             .then(response => {
//                 console.log('Réponse de /traiter:', response.data);
//                 setDetails(response.data); // Si la réponse est directement un tableau
//             })
//             .catch(error => {
//                 console.error('Erreur lors de la récupération des détails:', error);
//             });

//     }, []);

//     const handleClose = (index) => {
//         const detail = details[index];
//         if (detail && detail._id) {
//             const detailId = detail._id;
//             // Créer une nouvelle liste sans l'objet à l'index spécifié
//             const updatedDetails = details.filter((_, i) => i !== index);
//             setDetails(updatedDetails);

//             // Envoyer la requête DELETE au serveur
//             axios.delete(`http://localhost:5002/retirer/${detailId}`)
//                 .then(() => {
//                     console.log('Détail supprimé avec succès');
//                 })
//                 .catch(error => {
//                     console.error('Erreur lors de la suppression du détail:', error);
//                 });
//         } else {
//             console.error('ID invalide ou élément non trouvé dans les détails');
//         }
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         // Vérifier si toutes les cases sont cochées
//         if (!valide0 || !valide1 || !valide2 || !valide3) {
//             alert('Veuillez cocher toutes les cases de validation');
//             return;
//         }
//         // Soumettre le formulaire
//         axios.post('http://localhost:5002/demande_prod', {
//             project_name: projectName,
//             project_leader: projectLeader,
//             project_url: projectUrl,
//             project_tag: projectTag,
//             release_note: releaseNote, // Correction du nom du champ
//             valide0: valide0.toString(), // Convertir en chaîne de caractères
//             valide1: valide1.toString(),
//             valide2: valide2.toString(),
//             valide3: valide3.toString()
//         })
//             .then(response => {
//                 alert(response.data.message);
//                 // Réinitialiser les champs du formulaire
//                 setProjectName('');
//                 setProjectLeader('');
//                 setProjectUrl('');
//                 setProjectTag('');
//                 setReleaseNote('');
//                 setValide0(false); // Réinitialiser à false
//                 setValide1(false);
//                 setValide2(false);
//                 setValide3(false);
//                 setFormSubmitted(true);
//             })
//             .catch(error => {
//                 console.error('Erreur lors de la soumission du formulaire:', error);
//             });
//     };

//     return (
//         <div className="container">
//             <div className="left">
//             <h1>Formulaire de demande de production</h1>
//             <form onSubmit={handleFormSubmit}>
//                 <div>
//                     <label htmlFor="project_name">Nom du projet:</label>
//                     <select id="project_name" value={projectName} onChange={e => setProjectName(e.target.value)}>
//                         <option value="">Sélectionnez un projet</option>
//                         {projets.map((projet, index) => (
//                             <option key={index} value={projet}>{projet}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label htmlFor="project_leader">Chef du projet:</label>
//                     <select id="project_leader" value={projectLeader} onChange={e => setProjectLeader(e.target.value)}>
//                         <option value="">Sélectionnez un chef de projet</option>
//                         {users.map((user, index) => (
//                             <option key={index} value={user}>{user}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label htmlFor="project_url"> Url du projet:</label>
//                     <input type="text" id="project_url" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label htmlFor="project_tag">Tag du projet:</label>
//                     <input type="text" id="project_tag" value={projectTag} onChange={e => setProjectTag(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label htmlFor="release_note">Release Note:</label>
//                     <textarea id="release_note" value={releaseNote} onChange={e => setReleaseNote(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label>Validations:</label><br />        
//                     <label htmlFor="valide0"> 
//                     <input type="checkbox" id="valide0" checked={valide0} onChange={() => setValide0(!valide0)} />Valide 0</label><br />              
//                     <label htmlFor="valide1">
//                     <input type="checkbox" id="valide1" checked={valide1} onChange={() => setValide1(!valide1)} />Valide 1</label><br />
//                     <label htmlFor="valide2">
//                     <input type="checkbox" id="valide2" checked={valide2} onChange={() => setValide2(!valide2)} />Valide 2</label><br />
//                     <label htmlFor="valide3">
//                     <input type="checkbox" id="valide3" checked={valide3} onChange={() => setValide3(!valide3)} />Valide 3</label>
//                 </div>
//                 <button type="submit" disabled={formSubmitted}>Envoyer</button>
//             </form>
//             </div>
//             <div className="right">
//                 {details.map((detail, index) => (
//                     <div key={index}>
//                         {/* Affichage des détails */}
//                         <p>{JSON.stringify(detail)}</p>
//                         {/* Bouton pour fermer le détail */}
//                         <button onClick={() => handleClose(index)}>Fermer</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default DemandeProdForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios'
import "./../App.css";


// Configuration d'Axios pour pointer vers l'URL de votre serveur Flask
// axios.defaults.baseURL = 'http://localhost:5002'; // Remplacez par l'URL de votre serveur Flask

function DemandeProdForm() {
    const [projets, setProjets] = useState([]);
    const [users, setUsers] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [projectLeader, setProjectLeader] = useState('');
    const [projectUrl, setProjectUrl] = useState('');
    const [projectTag, setProjectTag] = useState('');
    const [releaseNote, setReleaseNote] = useState('');
    const [valide0, setValide0] = useState(false);
    const [valide1, setValide1] = useState(false);
    const [valide2, setValide2] = useState(false);
    const [valide3, setValide3] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [details, setDetails] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5002/get_projets')
            .then(response => {
                setProjets(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des projets:', error);
            });

        axios.get('http://localhost:5002/get_users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            });

        axios.get('http://localhost:5002/traiter')
            .then(response => {
                console.log('Réponse de /traiter:', response.data);
                setDetails(response.data); // Si la réponse est directement un tableau
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des détails:', error);
            });

    }, []);

    const handleClose = (detailId) => {
        // Trouver l'index du détail avec l'_id spécifié
        const index = details.findIndex(detail => detail._id === detailId);
        if (index !== -1) {
            // Créer une nouvelle liste sans l'objet à l'index spécifié
            const updatedDetails = details.filter((_, i) => i !== index);
            setDetails(updatedDetails);

            // Envoyer la requête DELETE au serveur
            axios.delete(`http://localhost:5002/retirer/${detailId}`)
                .then(() => {
                    console.log('Détail supprimé avec succès');
                })
                .catch(error => {
                    console.error('Erreur lors de la suppression du détail:', error);
                });
        } else {
            console.error('ID invalide ou élément non trouvé dans les détails');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Vérifier si toutes les cases sont cochées
        if (!valide0 || !valide1 || !valide2 || !valide3) {
            alert('Veuillez cocher toutes les cases de validation');
            return;
        }
        // Soumettre le formulaire
        axios.post('http://localhost:5002/demande_prod', {
            project_name: projectName,
            project_leader: projectLeader,
            project_url: projectUrl,
            project_tag: projectTag,
            release_note: releaseNote, // Correction du nom du champ
            valide0: valide0.toString(), // Convertir en chaîne de caractères
            valide1: valide1.toString(),
            valide2: valide2.toString(),
            valide3: valide3.toString()
        })
            .then(response => {
                alert(response.data.message);
                // Réinitialiser les champs du formulaire
                setProjectName('');
                setProjectLeader('');
                setProjectUrl('');
                setProjectTag('');
                setReleaseNote('');
                setValide0(false); // Réinitialiser à false
                setValide1(false);
                setValide2(false);
                setValide3(false);
                setFormSubmitted(true);
            })
            .catch(error => {
                console.error('Erreur lors de la soumission du formulaire:', error);
            });
    };

    return (
        <div className="container">
            <div className="left">
                <h1>Formulaire de demande de production</h1>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="project_name">Nom du projet:</label>
                        <select id="project_name" value={projectName} onChange={e => setProjectName(e.target.value)}>
                            <option value="">Sélectionnez un projet</option>
                            {projets.map((projet, index) => (
                                <option key={index} value={projet?._id}>{projet?.nom}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="project_leader">Chef du projet:</label>
                        <select id="project_leader" value={projectLeader} onChange={e => setProjectLeader(e.target.value)}>
                            <option value="">Sélectionnez un chef de projet</option>
                            {users.map((user, index) => (
                                <option key={index} value={user}>{user}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="project_url"> Url du projet:</label>
                        <input type="text" id="project_url" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="project_tag">Tag du projet:</label>
                        <input type="text" id="project_tag" value={projectTag} onChange={e => setProjectTag(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="release_note">Release Note:</label>
                        <textarea id="release_note" value={releaseNote} onChange={e => setReleaseNote(e.target.value)} required />
                    </div>
                    <div className="validation-section">
                        <div className="validation-title">Valider ces cases :</div>
                        <div className="validation-container">
                            <label htmlFor="valide0">
                                <input type="checkbox" id="valide0" checked={valide0} onChange={() => setValide0(!valide0)} />
                                Valide 0
                            </label>
                            <label htmlFor="valide1">
                                <input type="checkbox" id="valide1" checked={valide1} onChange={() => setValide1(!valide1)} />
                                Valide 1
                            </label>
                            <label htmlFor="valide2">
                                <input type="checkbox" id="valide2" checked={valide2} onChange={() => setValide2(!valide2)} />
                                Valide 2
                            </label>
                            <label htmlFor="valide3">
                                <input type="checkbox" id="valide3" checked={valide3} onChange={() => setValide3(!valide3)} />
                                Valide 3
                            </label>
                        </div>
                    </div>
                    <button type="submit" disabled={formSubmitted}>Envoyer</button>
                </form>
            </div>
            <div className="right">
                <h2>Reponses des demandes</h2>
                {details.map((detail, index) => (
                    <div key={index} className="detail-container">
                        <h3>Reponse demande {index + 1}</h3>
                        {Object.entries(detail).map(([key, value]) => {
                            // Vérifier si la valeur est un objet avec une clé $date et le convertir en chaîne de caractères
                            let displayValue = value;
                            if (value && typeof value === 'object' && value.$date) {
                                displayValue = new Date(value.$date).toLocaleString(); // Convertit la date en chaîne de caractères
                            }
                            return <p key={key}><strong>{key}:</strong> {displayValue}</p>;
                        })}
                        <button onClick={() => handleClose(detail._id)}>Fermer</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DemandeProdForm;



