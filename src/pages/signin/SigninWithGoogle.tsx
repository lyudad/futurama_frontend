import React, { useEffect } from 'react';
import { Button } from 'components/ui/button';
import { GoogleCircleFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSigninGoogleMutation } from 'store/api/authApi';
import { setUser } from 'store/reducers/login';

function SigninWithGoogle(): JSX.Element {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [signinGoogle, { data, isSuccess }] = useSigninGoogleMutation();

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUser({ token: data.token, user: data.user }));
        }
    }, [isSuccess]);
    return (
        <div>
            <Button
                onClick={() => {
                    signinGoogle('1');
                }}
                color="white"
                theme="black"
            >
                <a
                    href={`${process.env.REACT_APP_URL}user/auth/google`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <GoogleCircleFilled /> {t('SignInForm.signin_with_google')}
                </a>
            </Button>
        </div>
    );
}

export default SigninWithGoogle;
