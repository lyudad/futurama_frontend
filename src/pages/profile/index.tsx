import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'store/hooks';
import { useNavigate } from 'react-router-dom';
import profileImage from 'assets/icons/profile.png';
import { constants as urlConstants } from 'constants/urls';
import { Image } from 'antd';
import { Container, 
    FlexContainer, 
    Heading, 
    Info, 
    InfoItem, 
    Skill, 
    SmallHeading, 
    Title } from 'pages/vacancies/components/projectDetails/styles';
import { Experience, ProfileCard, InfoBlock } from './style';
import Card from './Card';


function Profile(): JSX.Element {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const profile = useAppSelector((state) => state.profile.profile);

    const user = useAppSelector((state) => state.auth.user);
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

    useEffect(() => {
        if (!profile?.position && user?.role === 'freelancer') {
            navigate('/settings');
        } if (user?.role !== 'freelancer') {
            navigate('/myjobs');
        }
    }, [profile]);


    return (
        <Container>
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

            {profile?.otherExperience || profile?.description ? (
                <Card
                    description={t('ProfilePage.otherExperience')}
                    data={otherExperience()}
                />
            ) : null}
        </Container>
    );
}

export default Profile;
