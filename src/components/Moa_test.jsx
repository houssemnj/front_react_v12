// 

import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal, Checkbox, message } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";
import "./../App.css";
import "./modal.css";

function Moa_test() {
    const [details_approuvees, setDetailsApprouvees] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [modalData, setModalData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); // état pour gérer l'ouverture/fermeture
    const [isChecked, setIsChecked] = useState(false);

    const showDetails = async (id) => {
        console.log("ID demandé:", id);
        try {
            const response = await axios.get(`http://localhost:5002/get_details_MOA/${id}`);
            setModalData(response.data);
            setIsModalOpen(true); // Ouvrir le modal
        } catch (error) {
            console.error("Erreur lors de la récupération des détails:", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false); // Fermer le modal
    };

    const handleCheck = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleFinish = () => {
        if (isChecked) {
            message.success({
                content: 'Precessus de deploiement terminé!',
                duration: 0,
                onClose: () => message.destroy(),
                btn: <Button onClick={() => message.destroy()}>Fermer</Button>,
            });
            setIsModalOpen(false); // Fermer le modal
        }
    };

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
        axios.get("http://localhost:5002/check_MOA")
            .then((response) => {
                console.log("Les demandes approuvées:", response.data);
                setDetailsApprouvees(response.data); // Met à jour l'état avec les données reçues
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des détails:", error);
            });
    }, []);

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
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button onClick={() => showDetails(record._id)}>Détails</Button>
            ),
        },

    ];

    // console.log(details_approuvees);
    return (
        <div>
            <h2>Réponses des demandes approuvées</h2>
            <Table columns={columns} dataSource={details_approuvees} />
            <Modal
                title="Détails de la demande"
                open={isModalOpen}
                onCancel={closeModal}
                footer={[
                    <Checkbox key="check" onChange={handleCheck} checked={isChecked}>
                        Vérifié
                    </Checkbox>,
                    <Button key="finish" onClick={handleFinish} disabled={!isChecked}>
                        Terminé
                    </Button>,
                ]}
            >
                <div>
                    <p><strong>ID Projet :</strong> {modalData.project_id}</p>
                    <p><strong>URL Projet :</strong> {modalData.url_project}</p>
                    <p><strong>Nom projet :</strong> {modalData.nom_projet}</p>
                </div>
            </Modal>
        </div>
    );
}

export default Moa_test;




// import React, { useState, useEffect, useRef, createContext, useContext } from "react";
// import { SearchOutlined } from "@ant-design/icons";
// import { Button, Input, Space, Table, Modal, Checkbox, message } from "antd";
// import Highlighter from "react-highlight-words";
// import axios from "axios";
// import "./../App.css";
// import "./modal.css";

// // Créer un contexte pour l'alerte globale
// const AlertContext = createContext({
//     showAlert: (content) => { },
//     hideAlert: () => { }
// });

// // Composant d'alerte globale
// const GlobalAlert = () => {
//     const { alertContent, isAlertOpen, hideAlert } = useContext(AlertContext);

//     return (
//         <Modal
//             title="Notification"
//             centered
//             open={isAlertOpen} // Utilisez `open` au lieu de `visible`
//             onCancel={hideAlert}
//             footer={[
//                 <Button key="close" onClick={hideAlert}>
//                     Fermer
//                 </Button>
//             ]}
//         >
//             {alertContent}
//         </Modal>
//     );
// };

// function Moa_test() {
//     const [details_approuvees, setDetailsApprouvees] = useState([]);
//     const [searchText, setSearchText] = useState("");
//     const [searchedColumn, setSearchedColumn] = useState("");
//     const searchInput = useRef(null);
//     const [modalData, setModalData] = useState({});
//     const [isModalOpen, setIsModalOpen] = useState(false); // état pour gérer l'ouverture/fermeture
//     const [isChecked, setIsChecked] = useState(false);
//     const [isAlertOpen, setIsAlertOpen] = useState(false);
//     const [alertContent, setAlertContent] = useState(null);

//     const showAlert = (content) => {
//         setAlertContent(content);
//         setIsAlertOpen(true); // Ouvrir l'alerte
//     };

//     const hideAlert = () => {
//         setIsAlertOpen(false); // Fermer l'alerte
//     };

//     const showDetails = async (id) => {
//         console.log("ID demandé:", id);
//         try {
//             const response = await axios.get(`http://localhost:5002/get_details_MOA/${id}`);
//             setModalData(response.data);
//             setIsModalOpen(true); // Ouvrir le modal
//         } catch (error) {
//             console.error("Erreur lors de la récupération des détails:", error);
//         }
//     };

//     const closeModal = () => {
//         setIsModalOpen(false); // Fermer le modal
//     };

//     const handleCheck = (e) => {
//         setIsChecked(e.target.checked);
//     };

//     const handleFinish = () => {
//         if (isChecked) {
//             showAlert('Le processus est terminé!');
//             setIsModalOpen(false); // Fermer le modal
//         }
//     };

//     const handleSearch = (selectedKeys, confirm, dataIndex) => {
//         confirm();
//         setSearchText(selectedKeys[0]);
//         setSearchedColumn(dataIndex);
//     };
//     const handleReset = (clearFilters) => {
//         clearFilters();
//         setSearchText("");
//     };
//     const getColumnSearchProps = (dataIndex) => ({
//         filterDropdown: ({
//             setSelectedKeys,
//             selectedKeys,
//             confirm,
//             clearFilters,
//             close,
//         }) => (
//             <div
//                 style={{
//                     padding: 8,
//                 }}
//                 onKeyDown={(e) => e.stopPropagation()}
//             >
//                 <Input
//                     ref={searchInput}
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={(e) =>
//                         setSelectedKeys(e.target.value ? [e.target.value] : [])
//                     }
//                     onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                     style={{
//                         marginBottom: 8,
//                         display: "block",
//                     }}
//                 />
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                         icon={<SearchOutlined />}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Search
//                     </Button>
//                     <Button
//                         onClick={() => clearFilters && handleReset(clearFilters)}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Reset
//                     </Button>
//                     <Button
//                         type="link"
//                         size="small"
//                         onClick={() => {
//                             confirm({
//                                 closeDropdown: false,
//                             });
//                             setSearchText(selectedKeys[0]);
//                             setSearchedColumn(dataIndex);
//                         }}
//                     >
//                         Filter
//                     </Button>
//                     <Button
//                         type="link"
//                         size="small"
//                         onClick={() => {
//                             close();
//                         }}
//                     >
//                         close
//                     </Button>
//                 </Space>
//             </div>
//         ),
//         filterIcon: (filtered) => (
//             <SearchOutlined
//                 style={{
//                     color: filtered ? "#1677ff" : undefined,
//                 }}
//             />
//         ),
//         onFilter: (value, record) =>
//             record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//         onFilterDropdownOpenChange: (visible) => {
//             if (visible) {
//                 setTimeout(() => searchInput.current?.select(), 100);
//             }
//         },
//         render: (text) =>
//             searchedColumn === dataIndex ? (
//                 <Highlighter
//                     highlightStyle={{
//                         backgroundColor: "#ffc069",
//                         padding: 0,
//                     }}
//                     searchWords={[searchText]}
//                     autoEscape
//                     textToHighlight={text ? text.toString() : ""}
//                 />
//             ) : (
//                 text
//             ),
//     });

//     useEffect(() => {
//         axios.get("http://localhost:5002/check_MOA")
//             .then((response) => {
//                 console.log("Les demandes approuvées:", response.data);
//                 setDetailsApprouvees(response.data); // Met à jour l'état avec les données reçues
//             })
//             .catch((error) => {
//                 console.error("Erreur lors de la récupération des détails:", error);
//             });
//     }, []);

//     const columns = [
//         {
//             title: "Date de demande",
//             dataIndex: "Date de demande",
//             key: "Date de demande",
//             render: (text) => <p>{new Date(text).toLocaleString()}</p>,
//         },
//         {
//             title: "ID Demande",
//             dataIndex: "_id",
//             key: "_id",
//         },
//         {
//             title: "Chef Projet",
//             dataIndex: "Chef de projet",
//             key: "chef",
//             ...getColumnSearchProps("Chef de projet"),
//         },
//         {
//             title: "Etat",
//             dataIndex: "etat",
//         },
//         {
//             title: 'Action',
//             key: 'action',
//             render: (_, record) => (
//                 <Button onClick={() => showDetails(record._id)}>Détails</Button>
//             ),
//         },

//     ];

//     // console.log(details_approuvees);
//     return (
//         <AlertContext.Provider value={{ alertContent, isAlertOpen, showAlert, hideAlert }}>
//             <div>
//                 <h2>Réponses des demandes approuvées</h2>
//                 <Table columns={columns} dataSource={details_approuvees} />
//                 <Modal
//                     title="Détails de la demande"
//                     open={isModalOpen}
//                     onCancel={() => setIsModalOpen(false)}
//                     footer={[
//                         <Checkbox key="check" onChange={handleCheck} checked={isChecked}>
//                             Vérifié
//                         </Checkbox>,
//                         <Button key="finish" onClick={handleFinish} disabled={!isChecked}>
//                             Terminé
//                         </Button>,
//                     ]}
//                 >
//                 <div>
//                     <p><strong>ID Projet :</strong> {modalData.project_id}</p>
//                     <p><strong>URL Projet :</strong> {modalData.url_project}</p>
//                     <p><strong>Nom projet :</strong> {modalData.nom_projet}</p>
//                 </div>
//                 </Modal>
//                 <GlobalAlert />
//             </div>
//         </AlertContext.Provider>
//     );
// }

// export default Moa_test;




