import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header2, Header3 } from 'pages/vacancies/styles';
import { UserProfile } from 'types/profile';
import { FlexContainer, Skill } from 'pages/vacancies/components/projectDetails/styles';
import { Image } from 'antd';
import { constants } from 'constants/urls';
import { CardWrapper } from '../styles';


export function Card({
    user,
    englishLevel,
    desirebleSalaryLevel,
    availableAmountOfHours,
    skills
}: UserProfile): JSX.Element {
    const { t } = useTranslation();
    return (

        <NavLink to={`/profile/${user?.id}`}>
            <CardWrapper>
                <Header2>{user?.firstName} {user?.lastName}</Header2>
                <FlexContainer>
                    <Image
                        style={{
                            maxHeight: '90px',
                            marginBottom: '23px',
                            width: 'auto'
                        }}
                        preview={false}
                        src={user?.photo}
                        fallback={constants.PHOTO_PLACEHOLDER}
                    />
                    <div style={{ marginLeft: '45px' }}>
                        <Header3>
                            {t('Vacancies.price')}
                            {desirebleSalaryLevel}
                        </Header3>
                        <Header3>
                            {t('GeneralSettings.mainForm.availableHours')}
                            {availableAmountOfHours}
                        </Header3>
                        <Header3>
                            {t('Vacancies.englishLevel')}
                            {englishLevel}
                        </Header3>
                    </div>
                </FlexContainer>

                <Header3>{t('Vacancy.keyskills')}</Header3>
                <div style={{ color: 'black', display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }}>
                    {skills?.map((skill: { id?: number, skill?: string; }) => (
                        <Skill key={skill.id}>{skill.skill}</Skill>
                    ))}
                </div>
            </CardWrapper>
        </NavLink>
    );
}
