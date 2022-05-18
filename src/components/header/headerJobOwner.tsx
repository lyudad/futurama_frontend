import React from 'react';
import { useTranslation } from 'react-i18next';
import Profile from 'assets/icons/profile.png';
import { constants } from 'constants/urls';
import { NavContainer, NavLink } from './styles';

export function HeaderJobOwner(): JSX.Element {
    const { t } = useTranslation();
    return (
        <NavContainer>
            <NavLink to={constants.HOME}>{t('MenuBar.newJob')}</NavLink>
            <NavLink to={constants.HOME}>
                {t('MenuBar.InvitesToInterview')}
            </NavLink>
            <NavLink to={constants.HOME}>{t('MenuBar.myJobPosts')}</NavLink>
            <NavLink to={constants.HOME}>{t('MenuBar.talent')}</NavLink>
            <NavLink to={constants.HOME}>{t('MenuBar.hires')}</NavLink>
            <NavLink to={constants.HOME}>{t('MenuBar.chats')}</NavLink>
            <NavLink to={constants.HOME}>
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
