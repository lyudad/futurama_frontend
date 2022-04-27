import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { NavContainer } from './styles';

export function Header(): JSX.Element {
    const { t } = useTranslation();
    return (
        <NavContainer>
            <div>
                <NavLink to="/">{t('MenuBar.home')}</NavLink>
            </div>
            <div>
                <NavLink to="/contacts">{t('MenuBar.contacts')}</NavLink>
            </div>
            <div>
                <NavLink to="/aboutus">{t('MenuBar.aboutus')}</NavLink>
            </div>
            <div>
                <NavLink to="/login">{t('MenuBar.login')}</NavLink>
            </div>
        </NavContainer>
    );
}
