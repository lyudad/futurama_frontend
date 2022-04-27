import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import { signUpPageLanguage } from 'constants/languages/english';
import { SignUpWithSocialMedia } from './signUpWithSocialMedia';

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
                    label={signUpPageLanguage.firstNameLabel}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    label={signUpPageLanguage.lastNameLabel}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label={signUpPageLanguage.emailLabel}
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
                    label={signUpPageLanguage.passwordLabel}
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
                        {signUpPageLanguage.signUpButtonText}
                    </Button>
                </Form.Item>
            </Form>
            <SignUpWithSocialMedia
                text={signUpPageLanguage.signUpWithGoogleText}
            />
            <SignUpWithSocialMedia
                text={signUpPageLanguage.signUpWithSocialMediaText}
            />
            <NavLink to="/signin">
                <Button type="link" htmlType="button">
                    {signUpPageLanguage.signInButtonText}
                </Button>
            </NavLink>
        </>
    );
}
