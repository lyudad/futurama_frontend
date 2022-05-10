import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { fonts } from 'constants/fonts';

export function GoSignIn(): JSX.Element {
    const { t } = useTranslation();

    return (
        <Button
            type="link"
            style={{
                height: '45px',
                borderRadius: '10px',
                border: 'none',
                fontSize: fonts.FONT_SIZE_BUTTONS,
                display: 'block',
                margin: '0 auto',
                marginTop: '80px',
            }}
        >
            <NavLink to="/login">{t('PasswordRecovery.goSignIn')}</NavLink>
        </Button>
    );
}
