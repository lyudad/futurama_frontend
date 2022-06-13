import React from 'react';
import { Button, Container } from 'pages/vacancies/components/projectDetails/styles';
import { Spinner } from 'components/ui/Spinner';
import { useGetProfileByIdQuery } from 'store/api/profileApi';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProfilePage } from './profilePage';

type param = {
    id: string;
};

function PublicProfile(): JSX.Element {
    const id: number = useParams<param>().id as unknown as number;
    const profile = useGetProfileByIdQuery(id).data;
    const user = profile?.user || { lastName: '', firstName: '', email: '' };
    const { t } = useTranslation();

    if (profile) {

        return (
            <Container>
                <ProfilePage
                    user={user}
                    profile={profile}
                />
                <NavLink style={{ color: 'black' }} to="/talents">
                    <Button>BACK TO PROFILES</Button>
                </NavLink>
                <Button>CLICK</Button>
            </Container >
        );
    }; return <Spinner />;
}

export default PublicProfile;