import React from 'react';
import NoDataFound from 'assets/no_data_found.png';

import { Spinner } from 'components/ui/Spinner';
import { Container, VacanciesContainer } from 'pages/vacancies/styles';

import { useGetAllProfilesQuery } from 'store/api/profileApi';
import { UserProfile } from 'types/profile';
import { Card } from './Card/Card';


export function Talents(): JSX.Element {

    const profiles = useGetAllProfilesQuery().data;

    if (profiles)

        return (
            <Container>
                <VacanciesContainer style={{ margin: '0 auto' }}>
                    {profiles?.length > 0 ? (
                        profiles.map((user: UserProfile) => (
                            <Card
                                key={user.id}
                                id={user.id}
                                user={user.user}
                                englishLevel={user.englishLevel}
                                educations={user.educations}
                                workExperience={user.workExperience}
                                skills={user.skills}
                                position={user.position}
                                desirebleSalaryLevel={user.desirebleSalaryLevel}
                                availableAmountOfHours={user.availableAmountOfHours}
                            />
                        ))
                    ) : (
                        <img
                            src={NoDataFound}
                            alt="No data found"
                            style={{
                                width: '610px',
                                borderRadius: '10px',
                            }}
                        />
                    )}
                </VacanciesContainer>
            </Container>
        ); else return <Spinner />;
}
