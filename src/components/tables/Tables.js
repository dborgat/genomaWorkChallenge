import React, { useState, useContext, useEffect } from "react";
//EXTERNAL COMPONENTS
import "antd/dist/antd.css";
import { Table, Popconfirm, Form, Typography, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

// INTERNAL COMPONENTS
import S from "./Tables.module.scss";
import Auth from "../../context/auth";
import {
  getRestaurants,
  addRestaurant,
  deleteRestaurant,
} from "../../services/restoRequest";
import { EditableCell } from "../../helpers/editableCell";

const Tables = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [flag, setFlag] = useState(false);
  const { token } = useContext(Auth);

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      location: "",
      food: "",
      rating: "",
      visited: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...restaurants];
      const index = newData.findIndex((item) => key === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setRestaurants(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setRestaurants(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      width: "20%",
      editable: true,
    },
    {
      title: "Ubicación",
      dataIndex: "location",
      width: "30%",
      editable: true,
    },
    {
      title: "Food",
      dataIndex: "food",
      width: "10%",
      editable: true,
    },
    {
      title: "Calificación",
      dataIndex: "rating",
      width: "10%",
      editable: true,
    },
    {
      title: "Visitado",
      dataIndex: "visited",
      width: "5%",
      editable: true,
    },
    {
      title: "Editar / Borrar",
      dataIndex: "Editar",
      width: "20%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm
              title="Seguro que desea cancelar?"
              onConfirm={cancel}
              okText="Si"
              cancelText="No, gracias"
            >
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Editar
            </Typography.Link>
            <Typography.Link disabled={editingKey !== ""}>
              <Popconfirm
                title={`Esta a punto de borrar el restaurante ${record.name}`}
                onConfirm={() => deleteOneRestaurant(record.id)}
                onVisibleChange={() => console.log("visible change")}
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
        editing: isEditing(record),
      }),
    };
  });
  /////------->>
  const addOneRestaurant = async (newRestaurant) => {
    try {
      await addRestaurant(newRestaurant, token);
      setFlag((flag) => !flag);
    } catch (e) {
      console.log("estoy en el front", e);
    }
  };
  const deleteOneRestaurant = async (id) => {
    try {
      await deleteRestaurant(id, token);
      setFlag((flag) => !flag);
    } catch (e) {
      console.log("estoy en el front", e);
    }
  };
  const handleAdd = () => {
    const newData = {
      name: "Davor Resto II",
      location: "San Miguel",
      food: "Hamburgesas",
      rating: 5,
      visited: true,
    };
    addOneRestaurant(newData);
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

  console.log("---->", restaurants);
  return (
    <div className={S.mainContainer}>
      <div className={S.blackBox}>
        <div className={S.tableContainer}>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={restaurants}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
          <Button
            onClick={handleAdd}
            type="primary"
            style={{ marginTop: -45, position: "absolute" }}
          >
            Agregar Una Fila
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tables;
