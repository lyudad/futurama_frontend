import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePasswordResetMutation } from 'store/api/passwordResetApi';

export function PasswordMakeNew(): JSX.Element {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('email');

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { t } = useTranslation();

    const [passwordReset, { data, error, isLoading }] =
        usePasswordResetMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.currentTarget;

        switch (name) {
            case 'password':
                setPassword(value);
                break;
            case 'passwordConfirm':
                setConfirmPassword(value);
                break;
            default:
        }
    };

    const onReset = (): void => {
        form.resetFields();
    };

    const openNotification = (): void => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button
                type="primary"
                size="small"
                onClick={() => notification.close(key)}
            >
                {t('passwordMakeNew.closeBtn')}
            </Button>
        );
        notification.open({
            message: 'Attention!',
            description: 'Passwords do not match',
            btn,
            key,
        });
    };

    const onFinish = (): void => {
        if (password === confirmPassword) {
            passwordReset({ password: confirmPassword, email: queryParam });
            navigate('/');
        } else {
            openNotification();
        }
        onReset();
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            form={form}
            onFinish={onFinish}
            style={{
                width: '300px',
                margin: '0 auto',
                padding: '55px',
                textAlign: 'center',
            }}
        >
            <Form.Item
                name="password"
                rules={[
                    { required: true, message: 'Please input your Password!' },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
            </Form.Item>
            <Form.Item
                name="passwordConfirm"
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    name="passwordConfirm"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >
                    {t('passwordMakeNew.continueBtn')}
                </Button>
            </Form.Item>
        </Form>
    );
}
