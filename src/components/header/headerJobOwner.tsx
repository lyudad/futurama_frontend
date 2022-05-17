import React from 'react';
import { useTranslation } from 'react-i18next';
import Profile from 'assets/icons/profile.png';
import { NavContainer, NavLink } from './styles';

export function HeaderJobOwner(): JSX.Element {
    const { t } = useTranslation();
    return (
        <NavContainer>
            <NavLink to="/">{t('MenuBar.newJob')}</NavLink>
            <NavLink to="/">{t('MenuBar.InvitesToInterview')}</NavLink>
            <NavLink to="/">{t('MenuBar.myJobPosts')}</NavLink>
            <NavLink to="/">{t('MenuBar.talent')}</NavLink>
            <NavLink to="/">{t('MenuBar.hires')}</NavLink>
            <NavLink to="/">{t('MenuBar.messages')}</NavLink>
            <NavLink to="/">
                <img
                    src={Profile}
                    alt="Profile"
                    style={{
                        borderRadius: '50%',
                        width: '100px',
                    }}
                />
            </NavLink>
        </NavContainer>
    );
}
