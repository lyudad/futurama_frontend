import { Upload, Form, Input, Button } from "antd";
import "antd/dist/antd.min.css";
import { useSetDataMutation } from "store/api/authApi";
import { Layout } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { constants } from "constants/urls";
const { Content } = Layout;

export function Settings(): JSX.Element {
  const [form] = Form.useForm();
  const [setData] = useSetDataMutation();

  const props = {
    name: "file",
    action: constants.USER_SETTINGS,
    headers: {
      contentType:"multipart/form-data",
      authorization: "",
    },
  };

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        maxWidth: "50%",
      }}
    >
      <h1>Contact info</h1>

      <Form
        onFinish={(values) => {
          setData(values)
        }}
        form={form}
        name="set_userData"
      >
        <Form.Item
          label={"First name"}
          name="Firstname"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Last name"}
          name="Lastname"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"E-mail"}
          name="Email"
          rules={[
            {
              required: true,
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
              max: 13,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="photo" label={"Photo"} rules={[{ required: true }]}>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
}
