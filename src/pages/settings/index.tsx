import { Upload, Form, Input, Button } from "antd";
import "antd/dist/antd.min.css";
import { useSetDataMutation } from "store/api/authApi";
import { Layout } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppSelector } from "store/hooks";
import { constants } from "constants/text";


const { Content } = Layout;

export function Settings(): JSX.Element {
  const [form] = Form.useForm();
  const [setData] = useSetDataMutation();
  const usermail = useAppSelector(state => state.email.value)
  

  const props = {
    name: "file",
    action: process.env.UPLOAD,
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
          setData({...values, user: usermail})
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
              message: `${constants.MAIL_VALID}`,
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
              message: `${constants.PHONE_VALID}`,
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
