import React from 'react';
import { useTranslation } from 'react-i18next';
import Profile from 'assets/icons/profile.png';
import { constants } from 'constants/urls';
import { useAppSelector } from 'store/hooks';
import { NavContainer, NavLink } from './styles';

export function HeaderJobOwner(): JSX.Element {
    const profilePhoto = useAppSelector(state => state.auth.user?.photo);
    const { t } = useTranslation();
    return (
        <NavContainer>
            <NavLink to={constants.MY_JOBS}>{t('MenuBar.myJobPosts')}</NavLink>
            <NavLink to={constants.SEND_EMAIL}>{t('MenuBar.newJob')}</NavLink>
            <NavLink to={constants.TALENTS}>{t('MenuBar.talent')}</NavLink>
            <NavLink to={constants.CONTRACTS}>{t('MenuBar.contracts')}</NavLink>
            <NavLink to={constants.SEND_EMAIL}>{t('MenuBar.chats')}</NavLink>
            <NavLink to={constants.USER_CONTACTS}>{t('Contacts.contactinfo')}</NavLink>
            <NavLink onClick={() => {
                localStorage.clear();
                document.location.reload();
            }} to={constants.LOGIN}>{t('MenuBar.logout')}</NavLink>
            <NavLink to={constants.HOME}>
                <img
                    src={profilePhoto || Profile}
                    alt="Profile"
                    style={{
                        borderRadius: '50%',
                        width: '80px',
                        margin: '8px'
                    }}
                />
            </NavLink>
        </NavContainer>
    );
}
