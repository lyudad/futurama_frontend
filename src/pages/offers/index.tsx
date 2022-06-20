import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container as Wrapper } from 'pages/contacts/styles';
import { Result } from 'antd';

function Offers(): JSX.Element {
    const { t } = useTranslation();
    return (
        <Wrapper><Result
            style={{
                background: 'white',
                borderRadius: '15px'
            }}
            title={t('Offers.noofers')}
        /></Wrapper>
    );
}

export default Offers;