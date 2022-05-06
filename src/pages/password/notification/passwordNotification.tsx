import React from 'react';
import { useTranslation } from 'react-i18next';
import { Notification } from './components/notification';
import { Container, Card, Header1, Header2 } from './styles';

export function PasswordNotification(): JSX.Element {
    const { t } = useTranslation();

    return (
        <Container>
            <Card>
                <Header1>{t('HomePage.futuramaBrand')}</Header1>
                <Header2>{t('HomePage.futuramaSlogan')}</Header2>
                <Notification />
            </Card>
        </Container>
    );
}
