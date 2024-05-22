import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
// import { useHistory } from 'react-router-dom';
import "./../App.css";
import { Badge, Button } from "antd";

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
  const [notifData, setNotifData] = useState([]);
  const [isNotifVisible, setIsNotifVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.post("http://localhost:5002/gest_notif");
        if (response.data && response.data.length > 0) {
          // Trier les notifications par date décroissante
          const sortedNotifData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setNotifData(sortedNotifData);
          updateUnreadCount(sortedNotifData);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const updateUnreadCount = (notifications) => {
    const lastReadDateTime = localStorage.getItem("lastReadDateTime");
    let newUnreadCount = 0;

    if (lastReadDateTime) {
      newUnreadCount = notifications.filter(notif => new Date(notif.date) > new Date(lastReadDateTime)).length;
    } else {
      newUnreadCount = notifications.length;
    }

    setUnreadCount(newUnreadCount);
  };

  const toggleNotifDiv = () => {
    setIsNotifVisible(!isNotifVisible);
    if (!isNotifVisible && notifData.length > 0) {
      // Marquer toutes les notifications comme lues en stockant la date et l'heure de la dernière notification
      const latestNotifDateTime = notifData[0].date; // Assurez-vous que notifData est trié par date décroissante
      localStorage.setItem("lastReadDateTime", latestNotifDateTime);
      setUnreadCount(0);
    }
  };

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formattedDateDeProd = moment(dateDeProd).format('DD/MM/YYYY - HH:mm');
    if (!valide0 || !valide1 || !valide2 || !valide3) {
      alert("Veuillez cocher toutes les cases de validation");
      return;
    }

    // Préparez le message à envoyer
    const now = new Date();
    const formattedDateTime = now.toISOString().replace('T', ' ').substring(0, 19);
    const messageToSend = {
      date: formattedDateTime,
      message: `Une demande a été initialisée pour le: \n projet ${projectInfo.project_name} ,\n l'URL: ${projectInfo.project_url} ,\n tag: ${projectTag} ,\n pour le : ${formattedDateDeProd}`
    };
    

    // Préparation de JSON à envoyer à l'endpoint etat_suivi
    const etatSuiviData = {
      project_id: projectInfo.project_id,
      project_name: projectInfo.project_name,
      initialisation: "demande initialisée",
      retour_deploiement: "Null",
      fin_de_test: "Null"
    };

    try {
      // Envoyez la demande de production
      const prodResponse = await axios.post("http://localhost:5002/demande_prod", {
        project_id: projectInfo.project_id,
        project_name: projectInfo.project_name,
        project_url: projectUrl,
        project_tag: projectTag,
        date_de_prod: formattedDateDeProd,
        release_note: releaseNote,
        valide0: valide0.toString(),
        valide1: valide1.toString(),
        valide2: valide2.toString(),
        valide3: valide3.toString(),
      });

      // Envoyez la notification
      const notifResponse = await axios.post('http://localhost:5002/gest_notif', messageToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Envoyez les données à l'endpoint etat_suivi
      const etatSuiviResponse = await axios.post('http://localhost:5002/etat_suivi', etatSuiviData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert(prodResponse.data.message);
      console.log("Réponse de l'endpoint gest_notif:", notifResponse.data);
      console.log("Réponse de l'endpoint etat_suivi:", etatSuiviResponse.data);
      resetForm();
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
    }
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
      <div style={{ position: 'absolute', top: '35px', right: '40px' }}>
             <Badge count={unreadCount}>
                   <BellOutlined onClick={toggleNotifDiv} className="bell-icon-hover" />

             </Badge>
        </div>
      {isNotifVisible && (
        <div className="notification-div">
          {notifData.map((notif, index) => (
            <div key={index} className="notification-item">
              <p><strong>Notification {index + 1}</strong></p>
              <p>{notif.date} <br /> {notif.message}</p>
            </div>
          ))}
        </div>
      )}
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
