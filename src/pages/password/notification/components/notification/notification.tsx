import React from 'react';
import { useAppSelector } from 'store/hooks';
import { useTranslation } from 'react-i18next';

export function Notification(): JSX.Element {
    const email = useAppSelector((state) => state.email.value);
    const { t } = useTranslation();

    return (
        <h2
            style={{
                width: '600px',
                margin: '0 auto',
                padding: '10px',
                textAlign: 'center',
            }}
        >
            {t('passwordNotification.notificationPartOne')}
            {email}
            {t('passwordNotification.notificationPartTwo')}
        </h2>
    );
}
