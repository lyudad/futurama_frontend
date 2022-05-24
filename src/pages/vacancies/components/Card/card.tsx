import React from 'react';
import { useTranslation } from 'react-i18next';
import { CardWrapper, Header2, Header3, Header4 } from 'pages/vacancies/styles';
import { NavLink } from 'react-router-dom';

interface IProps {
    title: string;
    company: string;
    location: string;
    description: string;
    englishLevel: string;
    price: number;
}

export function Card({
    title,
    company,
    location,
    description,
    englishLevel,
    price,
}: IProps): JSX.Element {
    const { t } = useTranslation();

    return (
        <NavLink to="/vacancy_details">
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
            </CardWrapper>
        </NavLink>
    );
}
