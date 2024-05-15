import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";
import "./../App.css";

function Reponse() {
  const [details, setDetails] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    axios
      .get("http://localhost:5002/traiter")
      .then((response) => {
        console.log("Réponse de /traiter:", response.data);
        setDetails(response.data); // Si la réponse est directement un tableau
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des détails:", error);
      });
    // ... (appel API pour récupérer les réponses des demandes)
  }, []);

  const handleClose = (detailId) => {
    // Trouver l'index du détail avec l'_id spécifié
    const index = details.findIndex((detail) => detail._id === detailId);
    if (index !== -1) {
      // Créer une nouvelle liste sans l'objet à l'index spécifié
      const updatedDetails = details.filter((_, i) => i !== index);
      setDetails(updatedDetails);

      // Envoyer la requête DELETE au serveur
      axios
        .delete(`http://localhost:5002/retirer/${detailId}`)
        .then(() => {
          console.log("Détail supprimé avec succès");
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression du détail:", error);
        });
    } else {
      console.error("ID invalide ou élément non trouvé dans les détails");
    }
  };

  const columns = [
    {
      title: "Date de demande",
      dataIndex: "Date de demande",
      key: "Date de demande",
      render: (text) => <p>{new Date(text).toLocaleString()}</p>,
    },
    {
      title: "ID Demande",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Chef Projet",
      dataIndex: "Chef de projet",
      key: "chef",
      ...getColumnSearchProps("Chef de projet"),
    },
    {
      title: "Etat",
      dataIndex: "etat",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <>
    //       {" "}
    //       <Button onClick={() => handleClose(record._id)}>Fermer</Button>
    //     </>
    //   ),
    // },
  ];

  console.log(details);

  return (
    <div>
      <h2>Reponses des demandes</h2>
      <Table columns={columns} dataSource={details} />
    </div>
    // ... (structure JSX pour l'affichage des réponses)
  );
}

export default Reponse;
