import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Typography, notification } from "antd";
import "./SuivieDEtat.css"; // Assurez-vous d'avoir un fichier CSS pour le style
// import "./../App.css";

function SuivieDEtat() {
    const [etatProjet, setEtatProjet] = useState([]);

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
        },
        {
            title: "Déploiement",
            dataIndex: "deploiement",
            key: "deploiement",
        },
        {
            title: "Test",
            dataIndex: "test",
            key: "test",
        },
    ];

    return (
        <div className="suivie-d-etat">
            <Typography.Title level={2}>Suivi d'État des Projets</Typography.Title>
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