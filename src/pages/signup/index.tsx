import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { string, object } from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { useSigninUserMutation, useSignupUserMutation } from 'store/api/authApi';
import { setUser } from 'store/reducers/auth';
import { signupForm } from 'types/auth';
import SignupWithGoogle from './SignupWithGoogle';
import SignupWithFacebook from './SignupWithFacebook';
import {
    ButtonsContainer,
    Card,
    ErrorSpan,
    FindADreamJob,
    FuturamaText,
    Role,
    SignupPage,
} from './styles';

export function SignUp(): JSX.Element {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [signupUser, signup] = useSignupUserMutation();
    const [signinUser, login] = useSigninUserMutation();
    const [formLogin, setFormLogin] = useState<any>({
        email: '',
        password: ''
    });
    const [isFailed, setIsFailed] = useState(signup.isError);

    const validationSchema = object({
        firstName: string().required('First name is required.'),
        lastName: string().required('Last name is required.'),
        email: string().email('Email must be an email address.').required('Email is required!'),
        password: string().min(8, 'Length at least must be 8 characters.').required('Password is required!'),
    });

    const initialValues: signupForm = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: ''
    };

    const renderError = (message: string): JSX.Element => (
        <ErrorSpan>{message}</ErrorSpan>
    );

    useEffect(() => {
        if(signup.isSuccess) {
            (async function(){                
                await signinUser({ email: formLogin.email, password: formLogin.password});
            })();
        }
        if(login.isSuccess) {                
            dispatch(setUser({ token: login.data.token, user: login.data.user }));
        }
        if (signup.isError) {
            setIsFailed(signup.isError);
        }                
    }, [signup.isSuccess, signup.isError, login.isSuccess]);

    return (
        <SignupPage>
            <Card>
                <FuturamaText>{t('SignUpForm.futurama')}</FuturamaText>
                <FindADreamJob>
                    {t('SignUpForm.find_a_dream_job')}
                </FindADreamJob>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {      
                        setFormLogin({email: values.email, password: values.password});                  
                        await signupUser(values);
                    }}
                >
                    <Form onFocus={() => setIsFailed(false)}>
                    <label htmlFor="firstName">{t('SignUpForm.firstName')}</label>
                        <Field
                            as={Input}
                            name="firstName"
                            type="text"
                            placeholder={t('SignUpForm.firstName')}
                        />
                        <ErrorMessage name="firstName" render={renderError} />
                        <br />
                        <label htmlFor="lastName">{t('SignUpForm.lastName')}</label>
                        <Field
                            as={Input}
                            name="lastName"
                            type="text"
                            placeholder={t('SignUpForm.lastName')}
                        />
                        <ErrorMessage name="lastName" render={renderError} />
                        <br />
                        <label htmlFor="email">{t('SignUpForm.email')}</label>
                        <Field
                            as={Input}
                            name="email"
                            type="text"
                            placeholder={t('SignUpForm.email')}
                        />
                        <ErrorMessage name="email" render={renderError} />
                        <br />
                        <label htmlFor="email">
                            {t('SignUpForm.password')}
                        </label>
                        <Field
                            as={Input}
                            name="password"
                            type="password"
                            placeholder={t('SignUpForm.password')}
                        />
                        <ErrorMessage
                            name="password"
                            render={renderError}
                        />
                        <Role>
                            <div>
                                <Field
                                    name="role"
                                    type="radio"
                                    value="freelancer"
                                    id="role1"
                                />
                                <label htmlFor="role1">
                                    {t('SignUpForm.freelancer')}
                                </label>
                            </div>
                            <div>
                                <Field
                                    name="role"
                                    type="radio"
                                    value="jobOwner"
                                    id="role2"
                                />
                                <label htmlFor="role2">
                                    {t('SignUpForm.jobOwner')}
                                </label>
                            </div>
                        </Role>
                        <ErrorMessage
                            name="role"
                            render={renderError}
                        />
                        <div>
                            {isFailed && signup.isError && (
                                <ErrorSpan>{JSON.stringify(signup.error)}</ErrorSpan>
                            )}
                        </div>
                        <Button
                            disabled={signup.isLoading}
                            type="submit"
                            color="white"
                            theme="#75CCD2;"
                            width="17"
                            margin="1"
                        >
                            {signup.isLoading
                                ? t('SignUpForm.loading')
                                : t('SignUpForm.signUp')}
                        </Button>
                    </Form>
                </Formik>
                <ButtonsContainer>
                    <SignupWithGoogle />
                    <SignupWithFacebook />
                </ButtonsContainer>
                <p>
                    {t('SignUpForm.already_have_an_account')}{' '}
                    <NavLink to="/login">{t('SignUpForm.signIn')}</NavLink>
                </p>
            </Card>
        </SignupPage>
    );
}
