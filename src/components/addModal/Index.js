import React from "react";
//EXTERNAL COMPONENTS
import "antd/dist/antd.css";
import { Form, Button, Col, Row, Input, Select, Modal } from "antd";

import {
  HeartOutlined,
  StarTwoTone,
  CheckSquareTwoTone,
  CloseSquareTwoTone,
  CloseCircleFilled,
} from "@ant-design/icons";

const Index = ({
  setNewRestaurant,
  showAddDrawer,
  openDrawer,
  newRestaurant,
  addOneRestaurant,
  loadingButton,
}) => {
  const { Option } = Select;

  const handleChangeNewRestaurant = ({ target }) => {
    const { value, name } = target;
    setNewRestaurant((newRestaurant) => ({ ...newRestaurant, [name]: value }));
  };

  return (
    <Modal
      destroyOnClose={true}
      centered={true}
      visible={openDrawer}
      title="Agrega un nuevo resto!"
      onCancel={() => showAddDrawer(false)}
      footer={[
        <Button key="back" onClick={() => showAddDrawer(false)}>
          Cancelar <CloseCircleFilled />
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loadingButton}
          onClick={() => addOneRestaurant(newRestaurant)}
          disabled={
            !newRestaurant.name ||
            !newRestaurant.visited.toString() ||
            !newRestaurant.rating ||
            !newRestaurant.location ||
            !newRestaurant.food
          }
        >
          Agregar Nuevo Resto <HeartOutlined />
        </Button>,
      ]}
    >
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Nombre"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el nombre del resto",
                },
              ]}
            >
              <Input
                name="name"
                placeholder="Por favor ingrese el nombre del resto"
                onChange={(e) => handleChangeNewRestaurant(e)}
                value={newRestaurant.name}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="location"
              label="Ubicación"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese la ubicación",
                },
              ]}
            >
              <Input
                placeholder="Por favor ingrese la ubicación"
                name="location"
                onChange={(e) => handleChangeNewRestaurant(e)}
                value={newRestaurant.location}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="visited"
              label="Lo visitaste?"
              rules={[
                {
                  required: true,
                  message: "Por favor complete el campo",
                },
              ]}
            >
              <Select
                placeholder="Por favor ingrese una opción"
                onSelect={(e) =>
                  setNewRestaurant((newRestaurant) => ({
                    ...newRestaurant,
                    visited: e,
                  }))
                }
              >
                <Option value={false}>
                  <CloseSquareTwoTone /> NO
                </Option>
                <Option value={true}>
                  <CheckSquareTwoTone /> SI
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="rating"
              label="Cuantos puntos le das?"
              rules={[
                {
                  required: true,
                  message: "Por favor complete el campo",
                },
              ]}
            >
              <Select
                placeholder="Por favor ingrese seleccione un puntaje"
                onSelect={(e) =>
                  setNewRestaurant((newRestaurant) => ({
                    ...newRestaurant,
                    rating: e,
                  }))
                }
              >
                <Option value={1}>
                  <StarTwoTone />
                </Option>
                <Option value={2}>
                  <StarTwoTone />
                  <StarTwoTone />
                </Option>
                <Option value={3}>
                  <StarTwoTone />
                  <StarTwoTone />
                  <StarTwoTone />
                </Option>
                <Option value={4}>
                  <StarTwoTone />
                  <StarTwoTone />
                  <StarTwoTone />
                  <StarTwoTone />
                </Option>
                <Option value={5}>
                  <StarTwoTone />
                  <StarTwoTone />
                  <StarTwoTone />
                  <StarTwoTone />
                  <StarTwoTone />
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="food"
              label="Que tipo de comida sirven?"
              onChange={(e) => handleChangeNewRestaurant(e)}
              value={newRestaurant.food}
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el tipo de comida",
                },
              ]}
            >
              <Input
                placeholder="Por favor ingrese el tipo de comida"
                name="food"
                onChange={(e) => handleChangeNewRestaurant(e)}
                value={newRestaurant.food}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Index;
