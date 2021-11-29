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
  openEditDrawer,
  showEditDrawer,
  editOneRestaurant,
  editRestaurant,
  setEditRestaurant,
  loadingButton,
}) => {
  const { Option } = Select;

  const handleChangeEditRestaurant = ({ target }) => {
    const { value, name } = target;
    setEditRestaurant((newRestaurant) => ({ ...newRestaurant, [name]: value }));
  };

  return (
    <div>
      <Modal
        centered={true}
        visible={openEditDrawer}
        destroyOnClose={true}
        title="Edita este Resto!"
        onCancel={() => showEditDrawer(false)}
        footer={[
          <Button key="back" onClick={() => showEditDrawer(false)}>
            Cancelar <CloseCircleFilled />
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loadingButton}
            onClick={() =>
              editOneRestaurant(editRestaurant.id, editRestaurant)
            }
          >
            Editar Resto <HeartOutlined />
          </Button>,
        ]}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                initialValue={editRestaurant.name}
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
                  onChange={(e) => handleChangeEditRestaurant(e)}
                  value={"editRestaurant.name"}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                initialValue={editRestaurant.location}
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
                  onChange={(e) => handleChangeEditRestaurant(e)}
                  value={editRestaurant.location}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                initialValue={editRestaurant.visited}
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
                    setEditRestaurant((newRestaurant) => ({
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
                initialValue={editRestaurant.rating}
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
                    setEditRestaurant((newRestaurant) => ({
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
                initialValue={editRestaurant.food}
                name="food"
                label="Que tipo de comida sirven?"
                onChange={(e) => handleChangeEditRestaurant(e)}
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
                  onChange={(e) => handleChangeEditRestaurant(e)}
                  value={editRestaurant.food}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Index;
