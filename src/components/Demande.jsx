import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
// import { useHistory } from 'react-router-dom';
import "./../App.css";
import { Button } from "antd";

function Demande() {
  // const history = useHistory();
  const [projets, setProjets] = useState([]);
  const [projectUrl, setProjectUrl] = useState("");
  const [projectTag, setProjectTag] = useState("");
  const [releaseNote, setReleaseNote] = useState("");
  const [projectInfo, setProjectInfo] = useState({}); // État pour stocker les infos du projet
  const [valide0, setValide0] = useState(false);
  const [valide1, setValide1] = useState(false);
  const [valide2, setValide2] = useState(false);
  const [valide3, setValide3] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [dateDeProd, setDateDeProd] = useState(new Date());
  // ... (autres états)

  useEffect(() => {
    axios
      .get("http://localhost:5002/get_project_urls")
      .then((response) => {
        setProjets(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des URLs des projets:",
          error
        );
      });
  }, []);

  useEffect(() => {
    if (projectUrl) {
      axios
        .post(
          "http://localhost:5002/get_project_info",
          { project_url: projectUrl },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data); // Ajoutez ceci pour voir la réponse complète
          setProjectInfo(response.data); // Stocker les infos du projet
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des informations du projet:",
            error
          );
        });
    }
  }, [projectUrl]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formattedDateDeProd = moment(dateDeProd).format('DD/MM/YYYY - HH:mm');
    if (!valide0 || !valide1 || !valide2 || !valide3) {
      alert("Veuillez cocher toutes les cases de validation");
      return;
    }
    // if (!projectInfo.project_id) {
    //     alert('L\'ID du projet n\'a pas été récupéré. Verifiez les authentifications ou veuillez réessayer.');
    //     return;
    // }

    axios
      .post("http://localhost:5002/demande_prod", {
        project_id: projectInfo.project_id, // Utiliser project_id de l'état
        project_name: projectInfo.project_name, // Utiliser project_name de l'état
        project_url: projectUrl,
        project_tag: projectTag,
        date_de_prod: formattedDateDeProd,
        release_note: releaseNote,
        valide0: valide0.toString(),
        valide1: valide1.toString(),
        valide2: valide2.toString(),
        valide3: valide3.toString(),
      })
      .then((response) => {
        alert(response.data.message);
        resetForm();
      })
      .catch((error) => {
        console.error("Erreur lors de la soumission du formulaire:", error);
      });
  };

  const resetForm = () => {
    setProjectUrl("");
    setProjectTag("");
    setReleaseNote("");
    setValide0(false);
    setValide1(false);
    setValide2(false);
    setValide3(false);
    setFormSubmitted(true);
  };

  // ... (JSX pour le formulaire)

  return (
    <div>
      <h1>Formulaire de demande de production</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="project_url">URL du projet :</label>
          <select
            id="project_url"
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
            required
          >
            <option value="">Sélectionnez l'URL d'un projet</option>
            {projets.map((url, index) => (
              <option key={index} value={url}>
                {url}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="project_tag">Tag du projet:</label>
          <input
            type="text"
            id="project_tag"
            value={projectTag}
            onChange={(e) => setProjectTag(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="release_note">Release Note:</label>
          <textarea
            id="release_note"
            value={releaseNote}
            onChange={(e) => setReleaseNote(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date de Production :</label>
          <DatePicker
            selected={dateDeProd}
            onChange={(date) => setDateDeProd(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy - HH:mm"
            timeCaption="Heure"
          />
        </div>
        <div className="validation-section">
          <div className="validation-title">Valider ces cases :</div>
          <div
            className="validation-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label htmlFor="valide0">
              <input
                type="checkbox"
                id="valide0"
                checked={valide0}
                onChange={() => setValide0(!valide0)}
              />
              Version du projet indiqué selon le framework dans les fichiers
              nécéssaires.
            </label>
            <label htmlFor="valide1">
              <input
                type="checkbox"
                id="valide1"
                checked={valide1}
                onChange={() => setValide1(!valide1)}
              />
              Pour les projets Front, Version + build date du projet indiqué
              pres du copyright du site.
            </label>
            <label htmlFor="valide2">
              <input
                type="checkbox"
                id="valide2"
                checked={valide2}
                onChange={() => setValide2(!valide2)}
              />
              Sentry Intégré (Avec sourcemaps pour les projets front)
            </label>
            <label htmlFor="valide3">
              <input
                type="checkbox"
                id="valide3"
                checked={valide3}
                onChange={() => setValide3(!valide3)}
              />
              Release Notes
            </label>
          </div>
        </div>
        <Button htmlType="submit" type="primary" size="large" disabled={formSubmitted}>
          Envoyer
        </Button>
      </form>
    </div>
    // ... (structure JSX pour le formulaire)
  );
}

export default Demande;
