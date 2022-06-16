import React, { useEffect } from 'react';
import { useAppSelector } from 'store/hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container } from 'pages/vacancies/components/projectDetails/styles';
import { useTranslation } from 'react-i18next';
import ProfileImage from 'assets/icons/profile.png';
import { Container as Wrapper, Heading } from 'pages/contacts/styles';
import { Spinner } from 'components/ui/Spinner';
import { useGetMyProfileQuery } from 'store/api/profileApi';
import { ProfilePage } from './profilePage';


function Profile(): JSX.Element {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const token = useAppSelector((state) => state.auth.token);
    const { data: profile, isLoading } = useGetMyProfileQuery({ token });
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (user?.role !== 'freelancer') {
            navigate('/myjobs');
        }
        if (!user?.phone) {
            navigate('/user/contacts');
        }
    }, [user?.phone, profile]);

    if (isLoading) return <Spinner />;
    if (profile && user)
        return (
            <Container>
                <ProfilePage
                    user={user}
                    profile={profile}
                />
            </Container >
        ); return <NavLink to='/settings'><Wrapper><img style={{
            width: '180px'
        }} src={ProfileImage} alt='profilePhoto'/>
            <Heading>{t('ProfilePage.empty')}</Heading></Wrapper></NavLink>;
}

export default Profile;
