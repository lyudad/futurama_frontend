import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'store/hooks';
import { addEmail } from 'store/reducers/email';
import { useTranslation } from 'react-i18next';
import { useSendEmailMutation } from 'store/api/passwordResetApi';
import { GoSignIn } from './components/goSignIn';
import { Container } from './styles';

export function PasswordRecovery(): JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { t } = useTranslation();

    const [sendEmail, { data, error, isLoading }] = useSendEmailMutation();

    interface Ivalues {
        Email: string;
    }

    const onReset = (): void => {
        form.resetFields();
    };
    const onFinish = (values: Ivalues): void => {
        sendEmail({ email: values.Email });
        dispatch(addEmail(values.Email));
        navigate('/password/notification');
        onReset();
    };

    return (
        <Container>
            <Form
                name="basic"
                form={form}
                labelCol={{ span: 8 }}
                initialValues={{ remember: false }}
                onFinish={onFinish}
                autoComplete="on"
            >
                <Form.Item
                    name="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                            type: 'email',
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <MailOutlined className="site-form-item-icon" />
                        }
                        placeholder="Please input your email"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {t('passwordRecovery.continueBtn')}
                    </Button>
                </Form.Item>
            </Form>
            <GoSignIn />
        </Container>
    );
}
