import * as React from 'react';
import 'antd/dist/antd.min.css';
import {
    Upload,
    Form,
    Input,
    Button,
    Image,
    Result,
    message,
} from 'antd';
import { Spinner } from 'components/ui/Spinner';
import { UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import {
    useGetContactsQuery,
    useSetContactsMutation,
} from 'store/api/contactsApi';
import { useAppSelector } from 'store/hooks';
import { constants as urlConstants } from 'constants/urls';
import { useNavigate } from 'react-router-dom';
import { Container, Heading, Wrapper } from './styles';


export function Contacts(): JSX.Element {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const token = useAppSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const [setData] = useSetContactsMutation();
    const { data, error } = useGetContactsQuery();

    const openMessage = (): void => {
        const key = 'updatable';
        message.loading({
            content: t('Contacts.updating'),
            key,
            style: {
                marginTop: '46%',
            },
        });
        setTimeout(() => {
            message.success({
                content: t('Contacts.updated'),
                key,
                duration: 2,
                style: {
                    marginTop: '46%',
                },
            });
        }, 1800);
    };
    async function handleclicker(values: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    }): Promise<void> {
        const el = document.querySelector<HTMLElement>('.ant-upload-list');
        if (el) {
            el.style.display = 'none';
        }
        openMessage();
        await setData(values).unwrap();
        navigate('/');
    }

    const uploadParams = {
        name: 'photo',
        action: `${urlConstants.PHOTO_UPLOAD}`,
        multiple: false,
        headers: {
            authorization: `Bearer ${token}`,
        },
    };

    if (error)
        return (
            <Result
                status="403"
                title="401"
                subTitle={t('Contacts.message401')}
            />
        );
    if (data)
        return (
            <Container>
                <Heading>{t('Contacts.contactinfo')}</Heading>
                <Wrapper>
                    <div
                        style={{
                            maxWidth: '50%',
                        }}
                    >
                        <Form
                            style={{
                                textAlign: 'right',
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
                                rules={[
                                    {
                                        required: true,
                                        message: t('Contacts.inputFirstname'),
                                        min: 2,
                                        max: 18,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={t('Contacts.lastname')}
                                name="lastName"
                                initialValue={data?.lastName}
                                rules={[
                                    {
                                        required: true,
                                        message: t('Contacts.inputLastname'),
                                        min: 2,
                                        max: 18,
                                    },
                                ]}
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
                                        type: 'email',
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
                                        max: 13
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
                            display: 'flex',
                            flexDirection: 'column',
                            textAlign: 'left'
                        }}
                    >
                        <Image
                            style={{
                                maxHeight: '202px',
                                marginBottom: '23px',
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
    return <Spinner />;
}
