import React, { useState } from 'react';
import { Button, Container } from 'pages/vacancies/components/projectDetails/styles';
import { Spinner } from 'components/ui/Spinner';
import { useGetProfileByIdQuery } from 'store/api/profileApi';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckOutlined } from '@ant-design/icons';
import { ProfilePage } from '../profile/profilePage';
import { SendInvite } from './sendInvite/SendInvite';

type param = {
    id: string;
};

function PublicProfile(): JSX.Element {
    const id: number = useParams<param>().id as unknown as number;
    const profile = useGetProfileByIdQuery(id).data;
    const user = profile?.user || { lastName: '', firstName: '', email: '' };
    const { t } = useTranslation();
    const [modal, showModal] = useState(false);
    const inviteExist = false;

    if (profile) {

        return (
            <Container>
                <ProfilePage
                    user={user}
                    profile={profile}
                />
                <SendInvite modal={modal} showModal={showModal} />
                <NavLink style={{ color: 'black' }} to="/talents">
                    <Button>{t('Invite.back')}</Button>
                </NavLink>
                {inviteExist ? <Button disabled><CheckOutlined /> {t('Invite.invited')}</Button> : <Button onClick={() => {
                    showModal(true);
                }}>{t('Invite.send')}</Button>}
            </Container >
        );
    }; return <Spinner />;
}

export default PublicProfile;