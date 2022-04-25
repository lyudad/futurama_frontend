import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { onFinish } from './signUpHooks';

import 'antd/dist/antd.css';

const { Option } = Select;

export function Home(): JSX.Element {
    const [form] = Form.useForm();

    const FORM_LAYOUT = {
        span: 8,
    };
    return (
        <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            labelCol={FORM_LAYOUT}
            wrapperCol={FORM_LAYOUT}
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
            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                >
                    <Option value="freelanser">Freelanser</Option>
                    <Option value="employer">Employer</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Sign Up
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="button">
                    Sign Up with Google
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="button">
                    Sign Up with Facebook
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="link" htmlType="button">
                    Sign In
                </Button>
            </Form.Item>
        </Form>
    );
}
