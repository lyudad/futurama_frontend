import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CardWrapper, Header2, Header3, Header4 } from 'pages/vacancies/styles';
import { IVacancy } from 'types/vacancy';
import { setSelectedVacancy } from 'store/reducers/selectedVacancy';
import { useAppDispatch } from 'store/hooks';

export function Card({
    ownerId,
    title,
    company,
    location,
    description,
    englishLevel,
    price,
    timePerWeek,
    createdAt,
    updatedAt,
    category,
    skills,
    id
}: IVacancy): JSX.Element {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onClick = (): void => {
        dispatch(
            setSelectedVacancy({
                ownerId,
                title,
                company,
                location,
                description,
                englishLevel,
                price,
                timePerWeek,
                createdAt,
                updatedAt,
                category,
                skills,
            })
        );
    };

    return (
        <NavLink to={`vacancies/${id}`} onClick={onClick}>
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