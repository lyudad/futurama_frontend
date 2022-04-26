import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

export function SignUpWithSocialMedia(props: { text: string }): JSX.Element {
    const { text } = props;
    const navigate = useNavigate();
    return (
        <Form onFinish={() => navigate('/signup/role')}>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {text}
                </Button>
            </Form.Item>
        </Form>
    );
}

export function SignUpForm(): JSX.Element {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    return (
        <>
            <Form
                form={form}
                name="user_register"
                onFinish={() => navigate('/signup/role')}
            >
                <Form.Item
                    name="firstname"
                    label="First Name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    label="Last Name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true },
                        {
                            min: 8,
                            message: 'Password must be minimum 8 characters.',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Sign UP
                    </Button>
                </Form.Item>
            </Form>
            <SignUpWithSocialMedia text="Create an account using Google" />
            <SignUpWithSocialMedia text="Create an account using social network" />
            <NavLink to="/signin">
                <Button type="link" htmlType="button">
                    Sign In
                </Button>
            </NavLink>
        </>
    );
}
