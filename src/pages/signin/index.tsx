import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GoogleCircleFilled } from '@ant-design/icons';
import { string, object } from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { useSigninUserMutation } from 'store/api/authApi';
import { setUser } from 'store/reducers/login';
import { loginForm } from 'types/login';
import { Card, ErrorSpan, LoginPage } from './styles';

export function SignIn(): JSX.Element {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signinUser, { data, isLoading, isSuccess }] =
        useSigninUserMutation();

    const validationSchema = object({
        email: string()
            .email('Email must be an email address.')
            .required('Email is required!'),
        password: string()
            .min(8, 'Length at least must be 8 characters.')
            .required('Password is required!'),
    });

    const initialValues: loginForm = {
        email: '',
        password: '',
    };

    const renderError = (message: string): JSX.Element => (
        <ErrorSpan>{message}</ErrorSpan>
    );

    if (isSuccess) {
        dispatch(setUser({ token: data.token, user: data.user }));
        navigate('/');
        localStorage.setItem('token', data.token);
    }

    return (
        <LoginPage>
            <Card>
                <h2>{t('SignInForm.login_text')}</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        await signinUser(values);
                        resetForm();
                    }}
                >
                    <Form>
                        <Field
                            as={Input}
                            name="email"
                            type="text"
                            placeholder={t('SignInForm.email')}
                        />
                        <ErrorMessage name="email" render={renderError} />
                        <Field
                            as={Input}
                            name="password"
                            type="password"
                            placeholder={t('SignInForm.password')}
                        />
                        <ErrorMessage name="password" render={renderError} />
                        <Button
                            disabled={isLoading}
                            type="submit"
                            color="white"
                            theme=" #00f9ff"
                        >
                            {isLoading
                                ? t('SignInForm.loading')
                                : t('SignInForm.signin')}
                        </Button>
                    </Form>
                </Formik>
                <Button color="white" theme="black">
                    <GoogleCircleFilled /> {t('SignInForm.signin_with_google')}
                </Button>
                <Button color="white" theme="black">
                    <NavLink to="/password_recovery">
                        {t('SignInForm.forgot_password')}
                    </NavLink>
                </Button>
                <p>
                    {t('SignInForm.do_not_have_an_account')}{' '}
                    <NavLink to="/register">{t('SignInForm.signup')}</NavLink>
                </p>
            </Card>
        </LoginPage>
    );
}