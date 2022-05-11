import React from 'react';
import { Button } from 'components/ui/button';
import { useTranslation } from 'react-i18next';
import FacebookIcon from 'assets/icons/facebook_icon.png';
import { ImageIcons } from './styles';

function SignupWithFacebook(): JSX.Element {
    const { t } = useTranslation();

    return (
        <div>
            <Button color="white" theme="#4876B9;" width="8">
                <a href="_" target="_blank" rel="noreferrer">
                    {t('SignUpForm.signUpWith')}
                </a>
                <ImageIcons>
                    <img src={FacebookIcon} alt="#" />
                </ImageIcons>
            </Button>
        </div>
    );
}

export default SignupWithFacebook;
