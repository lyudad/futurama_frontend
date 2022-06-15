import React, { useEffect } from 'react';
import { useAppSelector } from 'store/hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container } from 'pages/vacancies/components/projectDetails/styles';
import { ProfilePage } from './profilePage';
import { useTranslation } from 'react-i18next';
import ProfileImage from 'assets/icons/profile.png';
import { Container as Wrapper, Heading } from 'pages/contacts/styles';


function Profile(): JSX.Element {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const profile = useAppSelector((state) => state.profile.profile);
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (user?.role !== 'freelancer') {
            navigate('/myjobs');
        }
        if (!user?.phone) {
            navigate('/user/contacts');
        }
    }, [user?.phone, profile]);

    if (profile && user)
        return (
            <Container>
                <ProfilePage
                    user={user}
                    profile={profile}
                />
            </Container >
        ); return <NavLink to="/settings"> <Wrapper> <img style={{ width: '180px' }} src={ProfileImage} alt="" />
            <Heading>{t('ProfilePage.empty')}</Heading></Wrapper></NavLink>;
}

export default Profile;
