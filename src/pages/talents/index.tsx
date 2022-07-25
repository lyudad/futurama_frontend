import React from 'react';
import { Spinner } from 'components/ui/Spinner';
import { useGetAllProfilesQuery } from 'store/api/profileApi';
import { UserProfile } from 'types/profile';
import { Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { FlexColumn } from 'pages/chats/styles';
import { Container } from 'pages/vacancies/components/projectDetails/styles';
import { Card } from './Card/Card';

export function Talents(): JSX.Element {
    const profiles = useGetAllProfilesQuery().data;
    const { t } = useTranslation();

    if (profiles)
        return (
            <FlexColumn style={{ flexWrap: 'wrap' }}>
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
                ) : (<Container>
                    <Result title={t('Invite.notalentsfound')} /></Container>)}
            </FlexColumn>
        ); return <Spinner />;
}
