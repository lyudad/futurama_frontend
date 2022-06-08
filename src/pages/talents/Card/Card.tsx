import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CardWrapper, Header2, Header3 } from 'pages/vacancies/styles';
import { UserProfile } from 'types/profile';
import { Skill } from 'pages/vacancies/components/projectDetails/styles';
import { Image } from 'antd';
import { constants } from 'constants/urls';


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
            <CardWrapper style={{ width: '800px', padding: '2.5rem' }}>
                <Header2>{user?.firstName} {user?.lastName}</Header2>
                <div style={{ display: 'flex' }}>
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
                </div>

                <Header3>{t('Vacancy.keyskills')}</Header3>
                <div style={{ display: 'flex', justifyContent: 'left' }}>
                    {skills?.map((skill: { skill?: string; }) => (
                        <Skill style={{ color: 'black' }} key={skills.indexOf(skill)}>{skill.skill}</Skill>
                    ))}
                </div>
            </CardWrapper>
        </NavLink>
    );
}
