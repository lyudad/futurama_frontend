import React from 'react';
import { useAppSelector } from 'store/hooks';
import { useTranslation } from 'react-i18next';

export function Notification(): JSX.Element {
    const email = useAppSelector((state) => state.email.value);
    const { t } = useTranslation();

    return (
        <p style={{ width: '300px', margin: '0 auto', padding: '10px' }}>
            {t('passwordNotification.notificationPartOne')}
            {email}
            {t('passwordNotification.notificationPartTwo')}
        </p>
    );
}
