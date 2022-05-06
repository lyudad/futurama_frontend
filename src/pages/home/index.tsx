import Profile from 'pages/profile';
import React from 'react';
import { useTranslation } from 'react-i18next';

export function Home(): JSX.Element {
    const { t } = useTranslation();
    return (
        <div>
            <Profile />
        </div>
    );
}
