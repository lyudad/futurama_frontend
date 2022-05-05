import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'store/hooks';
import Card from './Card';
import { UserProfile, ProfilePhoto, UserInfo } from './style';

function Profile(): JSX.Element {
    const { t } = useTranslation();
    const user = useAppSelector((state) => state.profile.profile);

    const contactInformation = {
        Email: user?.email,
        Phone: user?.phoneNumber,
    };

    const positionAndSkills = {
        Position: user?.position,
        Skills: user?.skills,
    };

    const conditionsAtWork = {
        'Desirebl salary level (per hour)': user?.desirebleSalaryLevel,
        'Available amount of hours': user?.availableAmountOfHours,
    };

    const otherExperience = {
        'Other experience': user?.otherExperience,
        Description: user?.description,
    };

    return (
        <div className="container">
            <UserProfile>
                <UserInfo>
                    <ProfilePhoto>
                        <img src={user?.profilePhoto} alt="#" />
                    </ProfilePhoto>
                    <div>
                        <h2>
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <h3>
                            <strong>English level</strong>: {user?.englishLevel}
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
                {user?.workExperience &&
                    user?.workExperience.map((experience) => {
                        return (
                            <Card
                                description={t('ProfilePage.workExperience')}
                                data={experience}
                            />
                        );
                    })}
                {user?.education &&
                    user.education.map((educat) => {
                        return (
                            <Card
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
