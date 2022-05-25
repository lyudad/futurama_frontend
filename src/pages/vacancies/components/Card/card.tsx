import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    CardWrapper,
    Header2,
    Header3,
    Header4,
    Skill,
    SkillsContainer,
} from 'pages/vacancies/styles';
import { IVacancy } from 'types/vacancy';

export function Card({   
    title,
    company,
    location,
    description,
    englishLevel,
    price,
    skills,
    vacancyId
}: IVacancy): JSX.Element {
    const { t } = useTranslation();

    return (
        <NavLink to={`/vacancy/${vacancyId}`}>
            <CardWrapper>
                <Header2>{title}</Header2>
                <Header3>
                    {t('Vacancies.price')}
                    {price}
                </Header3>
                <Header3>
                    {t('Vacancies.company')}
                    {company}
                </Header3>
                <Header3>
                    {t('Vacancies.location')}
                    {location}
                </Header3>
                <Header4>
                    {t('Vacancies.englishLevel')}
                    {englishLevel}
                </Header4>
                <Header4>{`${description
                    .split(' ')
                    .slice(0, 45)
                    .join(' ')}...`}</Header4>
                <SkillsContainer>
                    {skills.map(({ skill, id }) => (
                        <Skill key={id}>{skill}</Skill>
                    ))}
                </SkillsContainer>
            </CardWrapper>
        </NavLink>
    );
}