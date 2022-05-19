import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'store/hooks';
import profileImage from 'assets/icons/profile.png';
import Card from './Card';
import { UserProfile, ProfilePhoto, UserInfo } from './style';

function Profile(): JSX.Element {
    const { t } = useTranslation();
    const profile = useAppSelector((state) => state.profile.profile); 
    const user = useAppSelector((state) => state.auth.user);   
    const contactInformation = {
        Email: user?.email,
        Phone: user?.phone,
    };

    const positionAndSkills = {
        Position: profile?.position,
        Skills: profile?.skills,
    };

    const conditionsAtWork = {
        'Desirebl salary level (per hour)': profile?.desirebleSalaryLevel,
        'Available amount of hours': profile?.availableAmountOfHours,
    };

    const otherExperience = {
        'Other experience': profile?.otherExperience,
        Description: profile?.description,
    };

    return (
        <div className="container">
            <UserProfile>
                <UserInfo>
                    <ProfilePhoto>
                        <img src={user?.photo || profileImage} alt="#" />
                    </ProfilePhoto>
                    <div>
                        <h2>
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <h3>
                            <strong>English level</strong>: {profile?.englishLevel}
                        </h3>
                    </div>
                </UserInfo>
                <Card
                    description={t('ProfilePage.contactInformation')}
                    data={contactInformation}
                />
                <Card
                    description={t('ProfilePage.positionAndSkills')}
                    data={positionAndSkills}
                />
                <Card
                    description={t('ProfilePage.conditionsForWork')}
                    data={conditionsAtWork}
                />
                {profile?.workExperience?.map((experience) => {
                        return (
                            <Card
                                key={Date.now()}
                                description={t('ProfilePage.workExperience')}
                                data={experience}
                            />
                        );
                    })}
                {profile?.educations?.map((educat) => {

                        return (
                            <Card
                                key={Date.now()}
                                description={t('ProfilePage.education')}
                                data={educat}
                            />
                        );
                    })}
                {otherExperience && (
                    <Card
                        description={t('ProfilePage.otherExperience')}
                        data={otherExperience}
                    />
                )}
            </UserProfile>
        </div>
    );
}

export default Profile;
