import "antd/dist/antd.min.css";
import {
  Upload,
  Form,
  Input,
  Button,
  Image,
  Spin,
  Result,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { useGetContactsQuery } from "store/api/contactsApi";
import { useSetContactsMutation } from "store/api/contactsApi";
import { useAppSelector } from "store/hooks";
import { constants as textConstants } from "constants/text";
import { constants as urlConstants } from "constants/urls";
import { Container, Heading, Wrapper } from "./styles";

export function Contacts(): JSX.Element {
  const token = useAppSelector((state) => state.login.token);
  const [form] = Form.useForm();
  const [setData] = useSetContactsMutation();
  const { data, error } = useGetContactsQuery();

  async function handleclicker(values: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }): Promise<void> {
    let el = document.querySelector<HTMLElement>(".ant-upload-list");
    if (el) {
      el.style.display = "none";
    }
    openMessage();
    await setData(values).unwrap();
  }

  const openMessage = () => {
    const key = "updatable";
    message.loading({
      content: "Updating...",
      key,
      style: {
        marginTop: "40%",
      },
    });
    setTimeout(() => {
      message.success({
        content: "Updated!",
        key,
        duration: 2,
        style: {
          marginTop: "40%",
        },
      });
    }, 1800);
  };

  const uploadParams = {
    name: "photo",
    action: `${urlConstants.PHOTO_UPLOAD}`,
    multiple: false,
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  if (error)
    return (
      <Result status="403" title="401" subTitle={textConstants.UNAUTHORIZD} />
    );
  else if (data)
    return (
      <Container>
        <Heading>Contact info</Heading>
        <Wrapper>
          <div
            style={{
              maxWidth: "50%",
            }}
          >
            <Form
              style={{
                textAlign: "right",
              }}
              onFinish={(values) => {
                handleclicker(values);
              }}
              form={form}
            >
              <Form.Item
                label={"First name"}
                name="firstName"
                initialValue={data?.firstName}
                required={true}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={"Last name"}
                name="lastName"
                initialValue={data?.lastName}
                required={true}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={"E-mail"}
                name="email"
                initialValue={data?.email}
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: `${textConstants.MAIL_VALID}`,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: `${textConstants.PHONE_VALID}`,
                    max: 13,
                  },
                ]}
                initialValue={data?.phone}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Image
              style={{
                maxHeight: "202px",
                marginBottom: "23px",
              }}
              preview={false}
              src={data?.photo}
              fallback={urlConstants.PHOTO_PLACEHOLDER}
            />
            <Upload {...uploadParams}>
              <Button type="primary" icon={<UploadOutlined />}>
                Click to update photo
              </Button>
            </Upload>
          </div>
        </Wrapper>
      </Container>
    );
  else return <Spin size="large" />;
}
