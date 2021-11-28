import React, { useState, useContext, useEffect } from "react";
//EXTERNAL COMPONENTS
import "antd/dist/antd.css";
import {
  Table,
  Popconfirm,
  Form,
  Typography,
  Button,
  notification,
} from "antd";
import { DeleteOutlined, HeartOutlined } from "@ant-design/icons";

// INTERNAL COMPONENTS
import S from "./Tables.module.scss";
import Auth from "../../context/auth";
import {
  getRestaurants,
  addRestaurant,
  deleteRestaurant,
  editRestaurants,
} from "../../services/restoRequest";
import EditModal from "../editModal/Index";
import AddModal from "../addModal/Index";
import { filterArray } from "../../helpers/filterRestaurants";
import { EditableCell } from "../../helpers/editableCell";

const Tables = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [flag, setFlag] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    location: "",
    food: "",
    rating: "",
    visited: "",
  });
  const [editRestaurant, setEditRestaurant] = useState({});
  const [filter, setFilter] = useState({ filteredInfo: null });
  const [filteredNames, setFilteredNames] = useState([]);
  const [filteredLocation, setFilteredLocation] = useState([]);
  const [filteredFood, setFilteredFood] = useState([]);
  const { token } = useContext(Auth);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      width: "30%",
      editable: true,
      filters: filteredNames,
      filteredValue: filter.filteredInfo?.name || null,
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: "Ubicación",
      dataIndex: "location",
      width: "25%",
      editable: true,
      filters: filteredLocation,
      filteredValue: filter.filteredInfo?.location || null,
      onFilter: (value, record) => record.location.includes(value),
    },
    {
      title: "Food",
      dataIndex: "food",
      width: "15%",
      editable: true,
      filters: filteredFood,
      filteredValue: filter.filteredInfo?.food || null,
      onFilter: (value, record) => record.food.includes(value),
    },
    {
      title: "Calificación",
      dataIndex: "rating",
      width: "10%",
      editable: true,
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Visitado",
      dataIndex: "visited",
      width: "5%",
      editable: true,
      sorter: (a, b) => a.visited - b.visited,
    },
    {
      title: "Editar / Borrar",
      dataIndex: "Editar",
      width: "30%",
      render: (_, record) => {
        return (
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => {
                showEditDrawer(true);
                setEditRestaurant(record);
              }}
            >
              Editar
            </Typography.Link>
            <Typography.Link disabled={editingKey !== ""}>
              <Popconfirm
                title={`Esta a punto de borrar el restaurante ${record.name}`}
                onConfirm={() => deleteOneRestaurant(record.id)}
                cancelText="No, gracias"
                okText="Si, borrarlo"
              >
                <DeleteOutlined />
              </Popconfirm>
            </Typography.Link>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "rating" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });
  /////------->>
  const openSuccesNotification = () => {
    notification["success"]({
      message: "Resto Agregado!",
      description: "Pordrá verlo al final de la lista!",
    });
  };
  const openWarningNotification = () => {
    notification["warning"]({
      message: "Resto Eliminado!",
      description: "Pordrá agregar uno nuevo cuando quiera!",
    });
  };
  const openErrorNotification = () => {
    notification["error"]({
      message: "Ya existe un restaurant con ese nombre",
      description: "Por favor ingrese otro nombre!",
    });
  };
  const openErrorDeleteNotification = () => {
    notification["error"]({
      message: "No se pudo borrar el resto",
      description: "Por favor intente nuevamente!",
    });
  };
  const openErrorEditNotification = () => {
    notification["error"]({
      message: "No se pudo editar el resto",
      description: "Por favor intente nuevamente!",
    });
  };
  const openSuccesEditNotification = () => {
    notification["success"]({
      message: "Resto Modificado!",
      description: "Muchas gracias!",
    });
  };


  const addOneRestaurant = async (newRestaurant) => {
    setLoadingButton(true);
    try {
      await addRestaurant(newRestaurant, token);
      setNewRestaurant({
        name: "",
        location: "",
        food: "",
        rating: "",
        visited: "",
      });
      showAddDrawer(false);
      openSuccesNotification();
      setLoadingButton(false);
      setFlag((flag) => !flag);
    } catch (e) {
      setLoadingButton(false);
      openErrorNotification();
    }
  };
  const deleteOneRestaurant = async (id) => {
    try {
      await deleteRestaurant(id, token);
      openWarningNotification();
      setFlag((flag) => !flag);
    } catch (e) {
      openErrorDeleteNotification();
    }
  };
  const editOneRestaurant = async (id, token, editRestaurant) => {
    setLoadingButton(true);
    try {
      showEditDrawer(false);
      await editRestaurants(id, token, editRestaurant);
      setLoadingButton(false);
      openSuccesEditNotification()
      setEditRestaurant({});
      setFlag((flag) => !flag);
    } catch (e) {
      setLoadingButton(false);
      showEditDrawer(false);
      openErrorEditNotification();
    }
  };

  const showAddDrawer = (boolean) => {
    setOpenDrawer(boolean);
  };
  const showEditDrawer = (boolean) => {
    setOpenEditDrawer(boolean);
  };
  const handleFilterChange = (pagination, filters, sorter) => {
    setFilter({
      filteredInfo: filters,
    });
  };

  const clearAll = () => {
    setFilter({ filteredInfo: null });
  };

  useEffect(() => {
    const getAllResto = async () => {
      try {
        const resp = await getRestaurants(token);
        setRestaurants(resp);
      } catch (e) {
        console.log(e);
      }
    };
    getAllResto();
  }, [flag, token]);

  useEffect(() => {
    if (!!restaurants.length) {
      setFilteredNames(filterArray(restaurants, "name"));
      setFilteredLocation(filterArray(restaurants, "location"));
      setFilteredFood(filterArray(restaurants, "food"));
    }
  }, [restaurants]);

  return (
    <div className={S.mainContainer}>
      <div className={S.tableContainer}>
        <Button onClick={() => clearAll()} style={{ marginBottom: "5px" }}>
          Limpiar Filtros
        </Button>

        <Form form={form} component={false}>
          <Table
            loading={!restaurants.length ? true : false}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            onChange={handleFilterChange}
            dataSource={restaurants}
            columns={mergedColumns}
            rowClassName="editable-row"
          />
        </Form>
        <Button
          type="primary"
          onClick={() => showAddDrawer(true)}
          icon={<HeartOutlined />}
          style={{ marginTop: -45, position: "absolute" }}
        >
          Agrega un nuevo resto
        </Button>
        <AddModal
          setNewRestaurant={setNewRestaurant}
          showAddDrawer={showAddDrawer}
          openDrawer={openDrawer}
          newRestaurant={newRestaurant}
          addOneRestaurant={addOneRestaurant}
          loadingButton={loadingButton}
        />
        <EditModal
          loadingButton={loadingButton}
          openEditDrawer={openEditDrawer}
          showEditDrawer={showEditDrawer}
          editOneRestaurant={editOneRestaurant}
          token={token}
          editRestaurant={editRestaurant}
          setEditRestaurant={setEditRestaurant}
        />
      </div>
    </div>
  );
};

export default Tables;
