import React from 'react';
import { useTranslation } from 'react-i18next';

export function Home(): JSX.Element {
    const { t } = useTranslation();
    return (
        <div>
            <div>
                <h2>{t('HomePage.home_page')}</h2>
            </div>
        </div>
    );
}
