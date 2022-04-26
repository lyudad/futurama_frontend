import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GoogleCircleFilled } from '@ant-design/icons';
import { string, object } from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';

import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { useSigninUserMutation } from 'store/api/authApi';
import { setUser } from 'store/reducers/login';
import { loginForm } from 'types/login';
import { Card, ErrorSpan, LoginPage } from './styles';

export function SignIn(): JSX.Element {
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
                <h2>Login</h2>
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
                            placeholder="Email"
                        />
                        <ErrorMessage name="email" render={renderError} />
                        <Field
                            as={Input}
                            name="password"
                            type="password"
                            placeholder="Password"
                        />
                        <ErrorMessage name="password" render={renderError} />
                        <Button
                            disabled={isLoading}
                            type="submit"
                            color="white"
                            theme=" #00f9ff"
                        >
                            {isLoading ? 'Loading...' : 'SIGN IN'}
                        </Button>
                    </Form>
                </Formik>
                <Button color="white" theme="black">
                    <GoogleCircleFilled /> Sign in with Google
                </Button>
                <Button color="white" theme="black">
                    Forgot password?
                </Button>
                <p>
                    Don&apos;t have an account?{' '}
                    <NavLink to="/register">Sign up</NavLink>
                </p>
            </Card>
        </LoginPage>
    );
}
