import React from 'react';
import { Spinner } from 'components/ui/Spinner';
import { Container } from 'pages/vacancies/styles';
import { Container as Wrapper } from 'pages/contacts/styles';
import { useGetAllProfilesQuery } from 'store/api/profileApi';
import { UserProfile } from 'types/profile';
import { FlexContainer } from 'pages/vacancies/components/projectDetails/styles';
import { Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { Card } from './Card/Card';


export function Talents(): JSX.Element {

    const profiles = useGetAllProfilesQuery().data;
    const { t } = useTranslation();
    if (profiles)

        return (
            <Container>
                <FlexContainer style={{ flexDirection: 'column', margin: '0 auto' }}>
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
                        <Result
                            style={{
                                background: 'white',
                                borderRadius: '15px'
                            }}
                            title={t('Invite.notalentsfound')}
                        />
                    )}
                </FlexContainer>
            </Container>
        ); return <Spinner />;
}
