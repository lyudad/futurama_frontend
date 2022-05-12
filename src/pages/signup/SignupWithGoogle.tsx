import React from 'react';
import { Button } from 'components/ui/button';
import { useTranslation } from 'react-i18next';
import GoogleIcon from 'assets/icons/google_icon.png';
import { ImageIcons } from './styles';

function SignupWithGoogle(): JSX.Element {
    const { t } = useTranslation();

    return (
        <div>
            <Button color="white" theme="black" width="8">
                <a href="#" rel="noreferrer">
                    {t('SignUpForm.signUpWith')}
                </a>
                <ImageIcons>
                    <img src={GoogleIcon} alt="#" />
                </ImageIcons>
            </Button>
        </div>
    );
}

export default SignupWithGoogle;
