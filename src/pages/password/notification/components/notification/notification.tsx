import React from 'react';
import { useAppSelector } from 'store/hooks';
import { useTranslation } from 'react-i18next';
import { fonts } from 'constants/fonts';

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
                fontSize: fonts.FONT_SIZE_LABELS,
            }}
        >
            {t('PasswordNotification.notificationPartOne')}
            {email}
            {t('PasswordNotification.notificationPartTwo')}
        </h2>
    );
}
