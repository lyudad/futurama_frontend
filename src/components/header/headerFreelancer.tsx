import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Profile from 'assets/icons/profile.png';
import { constants } from 'constants/urls';
import { NavContainer } from './styles';

export function HeaderFreelancer(): JSX.Element {
    const { t } = useTranslation();
    return (
        <NavContainer>
            <NavLink to={constants.VACANCIES}>
                {t('MenuBar.searchWork')}
            </NavLink>

            <NavLink to={constants.VACANCIES}>
                {t('MenuBar.InvitesToInterview')}
            </NavLink>

            <NavLink to={constants.VACANCIES}>{t('MenuBar.offers')}</NavLink>

            <NavLink to={constants.VACANCIES}>{t('MenuBar.contracts')}</NavLink>

            <NavLink to={constants.VACANCIES}>
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
