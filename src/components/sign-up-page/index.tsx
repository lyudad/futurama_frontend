import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';

import { onFinish } from '../../pages/signup/signUpHooks';
import { User } from '../../types/user.interface';

const { Option } = Select;

export function SignUpWithSocialMedia(props: { name: string }): JSX.Element {
    const { name } = props;
    return (
        <Form>
            <Form.Item>
                <Button type="primary" htmlType="button">
                    {`Sign Up with ${name}`}
                </Button>
            </Form.Item>
        </Form>
    );
}

export function SignUpForm(): JSX.Element {
    const [form] = Form.useForm();
    return (
        <>
            <Form
                form={form}
                name="user_register"
                onFinish={(values: User) => {
                    onFinish(values);
                }}
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
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true }]}
                >
                    <Select placeholder="Select a option">
                        <Option value="freelanser">Freelanser</Option>
                        <Option value="employer">Employer</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
            <SignUpWithSocialMedia name="Google" />
            <SignUpWithSocialMedia name="Facebook" />
            <NavLink to="/signin">
                <Button type="link" htmlType="button">
                    Sign In
                </Button>
            </NavLink>
        </>
    );
}
