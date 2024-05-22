import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Typography, notification } from "antd";
import "./SuivieDEtat.css"; // Assurez-vous d'avoir un fichier CSS pour le style

// import "./../App.css";

function SuivieDEtat() {
    const [etatProjet, setEtatProjet] = useState([]);

    const getStatusStyle = (status) => {
        if (status === "demande initialisée") return "status-green";
        if (status === "en attente") return "status-yellow";
        if (status === "approved") return "status-green";
        if (status.startsWith("refused")) return "status-red";
        return "";
    };

    useEffect(() => {
        const fetchEtatProjet = async () => {
            try {
                const response = await axios.get("http://localhost:5002/afficher_etat");
                setEtatProjet(response.data); // Met à jour l'état avec les données reçues
            } catch (error) {
                notification.error({
                    message: "Erreur de chargement",
                    description: "Impossible de charger les données de suivi d'état.",
                });
                console.error("Erreur lors de la récupération de l'état du projet:", error);
            }
        };

        fetchEtatProjet();

        // Ajout d'un intervalle pour rafraîchir les données toutes les 30 secondes
        const interval = setInterval(fetchEtatProjet, 5000);

        // Nettoyage de l'intervalle lors du démontage du composant
        return () => clearInterval(interval);
    }, []);

    const columns = [
        {
            title: "Nom du Projet",
            dataIndex: "project_name",
            key: "project_name",
        },
        {
            title: "Initialisation",
            dataIndex: "initialisation",
            key: "initialisation",
            render: (text) => <span className={getStatusStyle(text)}>{text}</span>,

        },
        {
            title: "Déploiement",
            dataIndex: "deploiement",
            key: "deploiement",
            render: (text) => <span className={getStatusStyle(text)}>{text}</span>,

        },
        {
            title: "Test",
            dataIndex: "test",
            key: "test",
            render: (text) => <span className={getStatusStyle(text)}>{text}</span>,

        },
    ];

    return (
        <div className="suivie-d-etat">
            <h1>Suivi d'État des Projets</h1>
            <Table
                columns={columns}
                dataSource={etatProjet}
                rowKey={(record) => record.project_id}
                pagination={{ pageSize: 10 }}
                style={{ marginTop: 24 }}
            />
        </div>
    );
}

export default SuivieDEtat;