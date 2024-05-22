// import React, { useState, useEffect, useRef } from "react";
// import { SearchOutlined } from "@ant-design/icons";
// import { Button, Input, Space, Table } from "antd";
// import Highlighter from "react-highlight-words";
// import axios from "axios";
// import "./../App.css";

// function Reponse() {
//   const [details_refusees, setDetailsRefusees] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");
//   const searchInput = useRef(null);
//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };
//   const handleReset = (clearFilters) => {
//     clearFilters();
//     setSearchText("");
//   };
//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//       close,
//     }) => (
//       <div
//         style={{
//           padding: 8,
//         }}
//         onKeyDown={(e) => e.stopPropagation()}
//       >
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{
//             marginBottom: 8,
//             display: "block",
//           }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({
//                 closeDropdown: false,
//               });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}
//           >
//             close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined
//         style={{
//           color: filtered ? "#1677ff" : undefined,
//         }}
//       />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{
//             backgroundColor: "#ffc069",
//             padding: 0,
//           }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });

//   useEffect(() => {
//     axios.get("http://localhost:5002/traiter")
//       .then((response) => {
//         console.log("Réponse de /traiter:", response.data);
//         setDetailsRefusees(response.data); // Met à jour l'état avec les données reçues
//       })
//       .catch((error) => {
//         console.error("Erreur lors de la récupération des détails:", error);
//       });
//   }, []);



//   const columns = [
//     {
//       title: "Date de demande",
//       dataIndex: "Date de demande",
//       key: "Date de demande",
//       render: (text) => <p>{new Date(text).toLocaleString()}</p>,
//     },
//     {
//       title: "ID Demande",
//       dataIndex: "_id",
//       key: "_id",
//     },
//     {
//       title: "Chef Projet",
//       dataIndex: "Chef de projet",
//       key: "chef",
//       ...getColumnSearchProps("Chef de projet"),
//     },
//     {
//       title: "Etat",
//       dataIndex: "etat",
//     },

//   ];

//   // console.log(details_refusees);


//   return (
//     <div>
//       <h2>Reponses des demandes refusées</h2>
//       <Table columns={columns} dataSource={details_refusees} />
//     </div>
//   );
// }

// export default Reponse;

import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import { Badge, Button, Input, Space, Table, notification } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";
import "./../App.css";

function Reponse() {
  const [details_refusees, setDetailsRefusees] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
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
    axios.get("http://localhost:5002/traiter")
      .then((response) => {
        console.log("Réponse de /traiter:", response.data);
        setDetailsRefusees(response.data); // Met à jour l'état avec les données reçues
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

  ];

  // console.log(details_refusees);


  return (
    <div>
      <h2>Réponses des demandes refusées</h2>
      <div style={{ position: 'fixed', top: 35, right: 32, zIndex: 1000 }}>
        <Badge count={unreadCount}>
          <BellOutlined onClick={toggleNotifDiv} style={{ fontSize: '24px', cursor: 'pointer' }} />
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
      <Table columns={columns} dataSource={details_refusees} /> 
    </div>
  );
}


export default Reponse;
