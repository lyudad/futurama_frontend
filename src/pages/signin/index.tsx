import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { string, object } from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { useSigninUserMutation } from 'store/api/authApi';
import { setUser } from 'store/reducers/auth';
import { loginForm } from 'types/auth';
import { constants } from 'constants/urls';
import { validations } from 'constants/validation';
import {  
    Card,
    ErrorSpan,
    FindADreamJob,
    FuturamaText,
    LoginPage,
} from './styles';

export function SignIn(): JSX.Element {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [signinUser, { data, isLoading, isSuccess, isError, error }] =
        useSigninUserMutation();
    const [isFailed, setIsFailed] = useState(isError);

    const validationSchema = object({
        email: string()
            .email(validations.emailMustBeEmail)
            .required(validations.email),
        password: string()
            .min(8, validations.passwordLength)
            .required(validations.password),
    });

    const initialValues: loginForm = { email: '', password: '' };

    const renderError = (message: string): JSX.Element => (
        <ErrorSpan>{message}</ErrorSpan>
    );

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUser({ token: data.token, user: data.user }));
        }
        if (isError) {
            setIsFailed(isError);
        }
    }, [isSuccess, isError]);

    return (
        <LoginPage>
            <Card>
                <FuturamaText>{t('SignInForm.futurama')}</FuturamaText>
                <FindADreamJob>
                    {t('SignInForm.find_a_dream_job')}
                </FindADreamJob>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        await signinUser(values);
                        resetForm();
                    }}
                >
                    <Form onFocus={() => setIsFailed(false)}>
                        <label htmlFor="email">{t('SignInForm.email')}</label>
                        <Field
                            as={Input}
                            name="email"
                            type="text"
                            placeholder={t('SignInForm.email')}
                        />
                        <ErrorMessage name="email" render={renderError} />
                        <br />
                        <label htmlFor="email">
                            {t('SignInForm.password')}
                        </label>
                        <Field
                            as={Input}
                            name="password"
                            type="password"
                            placeholder={t('SignInForm.password')}
                        />
                        <div>
                            <ErrorMessage
                                name="password"
                                render={renderError}
                            />
                        </div>
                        <NavLink to={constants.PASSWORD_RECOVERY}>
                            {t('SignInForm.forgot_password')}
                        </NavLink>
                        <div>
                            {isFailed && isError && (
                                <ErrorSpan>{JSON.stringify(error)}</ErrorSpan>
                            )}
                        </div>
                        <Button
                            disabled={isLoading}
                            type="submit"
                            color="white"
                            theme="#75CCD2;"
                            width="17"
                            margin="1"
                        >
                            {isLoading
                                ? t('SignInForm.loading')
                                : t('SignInForm.signin')}
                        </Button>
                    </Form>
                </Formik>               
                <p>
                    {t('SignInForm.do_not_have_an_account')}{' '}
                    <NavLink to="/signup">{t('SignInForm.signup')}</NavLink>
                </p>
            </Card>
        </LoginPage>
    );
}
