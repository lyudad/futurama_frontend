import React from 'react';
import { useTranslation } from 'react-i18next';
import { fonts } from 'constants/fonts';

interface IProps {
    email: string;
    isError: boolean;
}

export function Notification({ email, isError }: IProps): JSX.Element {
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
            {isError
                ? `${t(
                      'PasswordNotification.errorNotoficationPartOne'
                  )}${email}${t(
                      'PasswordNotification.errorNotoficationPartTwo'
                  )}`
                : `${t('PasswordNotification.notificationPartOne')}${email}${t(
                      'PasswordNotification.notificationPartTwo'
                  )}`}
        </h2>
    );
}
