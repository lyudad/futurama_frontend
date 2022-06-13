import React from 'react';
import {
    FlexContainer,
    Heading,
    Info,
    InfoItem,
    Skill,
    SmallHeading,
    Title
} from 'pages/vacancies/components/projectDetails/styles';
import profileImage from 'assets/icons/profile.png';
import { useTranslation } from 'react-i18next';
import { constants as urlConstants } from 'constants/urls';
import { Image } from 'antd';
import { UserProfile } from 'types/profile';
import { userState } from 'types/auth';
import { Experience, ProfileCard, InfoBlock } from './style';
import Card from './Card';


interface Props {
    profile: UserProfile;
    user: userState;
}

export function ProfilePage({ user, profile }: Props): JSX.Element {
    const { t } = useTranslation();

    const contactInformation = {
        Email: user?.email,
        Phone: user?.phone,
    };

    function otherExperience(): object {
        if (profile?.otherExperience) {
            return {
                'Other experience': profile?.otherExperience,
                Description: profile?.description
            };
        } return { Description: profile?.description };
    }

    return (
        <>
            <Heading>{user?.firstName} {user?.lastName}</Heading>
            <SmallHeading>{profile?.position?.category}</SmallHeading>

            <FlexContainer style={{ marginTop: '25px' }}>
                <Image
                    style={{
                        maxHeight: '200px',
                        borderRadius: '0.5rem',
                        boxShadow: '2px 2px 3px 2px rgba(162, 185, 187, 0.62)'
                    }}
                    preview={false}
                    src={user?.photo || profileImage}
                    fallback={urlConstants.PHOTO_PLACEHOLDER}
                />
                <div style={{
                    marginLeft: '30px',
                    width: '74%'
                }}>
                    <Info style={{ margin: 0, flexWrap: 'wrap' }}>
                        <InfoBlock>
                            <Title> {t('GeneralSettings.mainForm.salary')}</Title>
                            <InfoItem>${profile?.desirebleSalaryLevel}</InfoItem>
                        </InfoBlock>
                        <InfoBlock>
                            <Title> {t('GeneralSettings.mainForm.availableHours')}</Title>
                            <InfoItem>{profile?.availableAmountOfHours} hour</InfoItem>
                        </InfoBlock>
                        <InfoBlock>
                            <Title>{t('Vacancy.englishlevel')}</Title>
                            <InfoItem>{profile?.englishLevel}</InfoItem>
                        </InfoBlock>
                    </Info>
                    <Card
                        description={t('ProfilePage.contactInformation')}
                        data={contactInformation}
                    />
                </div>
            </FlexContainer>

            <ProfileCard><h2>{t('ProfilePage.Skills')}</h2>
                {profile?.skills?.map((skill: { id?: number, skill?: string; }) => (
                    <Skill key={skill.id}>{skill.skill}</Skill>
                ))}
            </ProfileCard>

            {profile?.workExperience?.length ? (
                <ProfileCard>
                    <h2>{t('ProfilePage.workExperience')}</h2>
                    <Experience>
                        {profile?.workExperience?.map((experience) => {
                            return (
                                <div key={experience.id} style={{ flex: '0 0 24%', marginRight: '10px' }}>
                                    <Card child
                                        key={experience.id}
                                        data={experience}
                                    />
                                </div>
                            );
                        })}
                    </Experience>
                </ProfileCard>
            ) : null}

            {profile?.educations?.length ? (
                <ProfileCard>
                    <h2>{t('ProfilePage.education')}</h2>
                    <Experience>
                        {profile?.educations?.map((educat) => {
                            return (
                                <Card child
                                    key={educat.id}
                                    data={educat}
                                />
                            );
                        })}
                    </Experience>
                </ProfileCard>
            ) : null}

            {(profile?.otherExperience || profile?.description) && profile?.description !== ' ' ? (
                <Card
                    description={t('ProfilePage.otherExperience')}
                    data={otherExperience()}
                />
            ) : null}
        </>
    );
}

