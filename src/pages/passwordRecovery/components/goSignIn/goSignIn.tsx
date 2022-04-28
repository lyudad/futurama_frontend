import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

export function GoSignIn(): JSX.Element {
    const { t } = useTranslation();

    return (
        <Button type="link">
            <NavLink to="/">{t('passwordRecovery.goSignIn')}</NavLink>
        </Button>
    );
}
