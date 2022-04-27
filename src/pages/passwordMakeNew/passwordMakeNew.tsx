import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export function PasswordMakeNew(): JSX.Element {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isMatch, setIsMatch] = useState<boolean>(false);

    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleChange = (e: any): void => {
        const { name, value } = e.currentTarget;

        switch (name) {
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
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
                Close
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
        onReset();
        if (password === confirmPassword) setIsMatch(true);
        if (isMatch) {
            navigate('/');
        } else {
            openNotification();
        }
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            form={form}
            onFinish={onFinish}
            style={{ width: '300px', margin: '0 auto', padding: '10px' }}
        >
            <Form.Item
                name="password"
                rules={[
                    { required: true, message: 'Please input your Password!' },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
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
                    Continue
                </Button>
            </Form.Item>
        </Form>
    );
}
