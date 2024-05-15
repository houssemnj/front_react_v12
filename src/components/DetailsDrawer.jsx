import React, { useEffect, useState } from "react";
import { Button, Descriptions, Drawer, Space } from "antd";
import dayjs from "dayjs";
const DetailsDrawer = ({
  record,
  handleApprove,
  handleRefuse,
  handleSendRefusal,
  setRefusalReason,
  refusalReason,
  refusalInputFor,
}) => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [desc, setDesc] = useState([]);
  const showDefaultDrawer = () => {
    setSize("default");
    setOpen(true);
  };
  const showLargeDrawer = () => {
    setSize("large");
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const items = [
      {
        key: "1",
        label: "Date de damande",
        children: dayjs(record?.date_demande).format("DD/MM/YYYY HH:mm"),
      },
      {
        key: "2",
        label: "ID Demande",
        children: record?._id,
      },
      {
        key: "3",
        label: "ID Projet",
        children: record?.project_id,
      },
      {
        key: "4",
        label: "Nom Projet",
        children: record?.nom,
      },
      {
        key: "5",
        label: "Chef de Projet",
        children: record?.project_leader,
      },
      {
        key: "6",
        label: "Tag",
        children: record?.tag,
      },
      {
        key: "8",
        label: "URL",
        span: 4,
        children: record?.url_project,
      },
      {
        key: "9",
        label: "Release Note",
        span: 4,
        children: record?.release_note,
      },
      {
        key: "10",
        span: 4,
        label:
          "Version du projet indiqué selon le framework dans les fichiers nécéssaires.",
        children: "Vérifié",
      },
      {
        key: "10",
        span: 4,
        label:
          "Pour les projets Front, Version + build date du projet indiqué pres du copyright du site.",
        children: "Vérifié",
      },
      {
        key: "10",
        span: 4,
        label: "Sentry Intégré (Avec sourcemaps pour les projets front)",
        children: "Vérifié",
      },
      {
        key: "10",
        span: 4,
        label: "Release Notes",
        children: "Vérifié",
      },
    ];

    setDesc(items);
  }, [record]);
  return (
    <>
      <Space>
        <Button type="primary" onClick={showLargeDrawer}>
          Détails
        </Button>
      </Space>
      <Drawer
        title={`Demande de mise en production - ${record?._id}`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Descriptions title="Information" layout="vertical" items={desc} />
        <div style={{ display: "flex", gap: 10 }}>
          <Button type="primary" onClick={() => handleApprove(record._id)}>
            Approuver
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleRefuse(record._id)}
          >
            Refuser
          </Button>
        </div>
        {refusalInputFor && (
          <div>
            <input
              type="text"
              value={refusalReason}
              onChange={(e) => setRefusalReason(e.target.value)}
              placeholder="Motif de refus"
            />
            <Button onClick={() => handleSendRefusal(record._id)}>
              Envoyer
            </Button>
          </div>
        )}
      </Drawer>
    </>
  );
};
export default DetailsDrawer;
