import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./../App.css";

function Reponse() {
    const [details, setDetails] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5002/traiter')
            .then(response => {
                console.log('Réponse de /traiter:', response.data);
                setDetails(response.data); // Si la réponse est directement un tableau
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des détails:', error);
            });
        // ... (appel API pour récupérer les réponses des demandes)
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

    return (
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
        // ... (structure JSX pour l'affichage des réponses)
    );
}

export default Reponse;