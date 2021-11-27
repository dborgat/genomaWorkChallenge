import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Input, InputNumber, Form } from "antd";


export const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : children.includes(false) || children.includes(true) ? (
          children.includes(true) ? (
            <CheckOutlined />
          ) : (
            <CloseOutlined />
          )
        ) : (
          children
        )}
      </td>
    );
  };
  