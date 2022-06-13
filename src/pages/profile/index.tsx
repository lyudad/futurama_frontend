import React, { useEffect } from 'react';
import { useAppSelector } from 'store/hooks';
import { useNavigate } from 'react-router-dom';
import { Container } from 'pages/vacancies/components/projectDetails/styles';
import { ProfilePage } from './profilePage';


function Profile(): JSX.Element {
    const navigate = useNavigate();

    const profile = useAppSelector((state) => state.profile.profile);
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (!profile?.position && user?.role === 'freelancer') {
            navigate('/settings');
        } if (user?.role !== 'freelancer') {
            navigate('/myjobs');
        }
    }, [profile]);

    if (profile && user)
        return (
            <Container>
                <ProfilePage
                    user={user}
                    profile={profile}
                />
            </Container >
        ); return <div />;
}

export default Profile;
