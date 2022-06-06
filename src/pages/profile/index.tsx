import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'store/hooks';
import profileImage from 'assets/icons/profile.png';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { UserProfile, ProfilePhoto, UserInfo } from './style';

function Profile(): JSX.Element {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const profile = useAppSelector((state) => state.profile.profile); 
    
    const user = useAppSelector((state) => state.auth.user);   
    const contactInformation = {
        Email: user?.email,
        Phone: user?.phone,
    };

    const Skills = {
        Skills: profile?.skills,
    };

    const conditionsAtWork = {
        'Desirebl salary level (per hour)': profile?.desirebleSalaryLevel,
        'Available amount of hours': profile?.availableAmountOfHours,
    };

    const otherExperience = {
        'Other experience': profile?.otherExperience,
        Description: profile?.description,
        'English level': profile?.englishLevel
    };

    useEffect(() => {
        if(!profile?.position){            
            navigate('/settings');
        }
    }, [profile])
    

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
                            <strong>{t('ProfilePage.Position')}</strong>: {profile?.position?.category}
                        </h3>
                    </div>
                </UserInfo>
                <Card
                    description={t('ProfilePage.contactInformation')}
                    data={contactInformation}
                />
                <Card
                    description={t('ProfilePage.Skills')}
                    data={Skills}
                />
                <Card
                    description={t('ProfilePage.conditionsForWork')}
                    data={conditionsAtWork}
                />
                {profile?.workExperience?.map((experience) => {
                        return (
                            <Card
                                key={experience.id}
                                description={t('ProfilePage.workExperience')}
                                data={experience}
                            />
                        );
                    })}
                {profile?.educations?.map((educat) => {
                        return (
                            <Card
                                key={educat.id}
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
