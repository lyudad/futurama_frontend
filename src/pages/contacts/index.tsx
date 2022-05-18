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
import { useTranslation } from 'react-i18next';

import { useGetContactsQuery } from "store/api/contactsApi";
import { useSetContactsMutation } from "store/api/contactsApi";
import { useAppSelector } from "store/hooks";
import { constants as urlConstants } from "constants/urls";
import { Container, Heading, Wrapper } from "./styles";

export function Contacts(): JSX.Element {  
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const token = useAppSelector((state) => state.login.token);

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
      content: t('Contacts.updating'),
      key,
      style: {
        marginTop: "40%",
      },
    });
    setTimeout(() => {
      message.success({
        content: t('Contacts.updated'),
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
      <Result status="403" title="401" subTitle={t('Contacts.message401')} />
    );
  else if (data)
    return (
      <Container>
        <Heading>{t('Contacts.contactinfo')}</Heading>
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
                label={t('Contacts.firstname')}
                name="firstName"
                initialValue={data?.firstName}
                required={true}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={t('Contacts.lastname')}
                name="lastName"
                initialValue={data?.lastName}
                required={true}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={t('Contacts.email')}
                name="email"
                initialValue={data?.email}
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: t('Contacts.mailnotvalid'),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label={t('Contacts.phone')}
                rules={[
                  {
                    required: true,
                    message: t('Contacts.phonenotvalid'),
                    max: 13,
                  },
                ]}
                initialValue={data?.phone}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                {t('Contacts.save')}
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
              {t('Contacts.updatephoto')}
              </Button>
            </Upload>
          </div>
        </Wrapper>
      </Container>
    );
  else return <Spin size="large" />;
}
