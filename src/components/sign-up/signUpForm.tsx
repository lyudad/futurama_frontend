import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import { useTranslation } from 'react-i18next';
import { SignUpWithSocialMedia } from './signUpWithSocialMedia';

export function SignUpForm(): JSX.Element {
    const { t } = useTranslation();
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
                    label={t('SignUpPage.firstNameLabel')}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    label={t('SignUpPage.lastNameLabel')}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label={t('SignUpPage.email')}
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
                    label={t('SignUpPage.password')}
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
                        {t('SignUpPage.signUp')}
                    </Button>
                </Form.Item>
            </Form>
            <SignUpWithSocialMedia text={t('SignUpPage.signUpWithGoogle')} />
            <SignUpWithSocialMedia
                text={t('SignUpPage.signUpWithSocialMedia')}
            />
            <NavLink to="/signin">
                <Button type="link" htmlType="button">
                    {t('SignUpPage.signIn')}
                </Button>
            </NavLink>
        </>
    );
}
