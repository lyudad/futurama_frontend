import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container as Wrapper } from 'pages/contacts/styles';
import { Result } from 'antd';

function Chats(): JSX.Element {
    const { t } = useTranslation();
    return (
        <Wrapper><Result
            style={{
                background: 'white',
                borderRadius: '15px'
            }}
            title='Development in progress...'
        /></Wrapper>
    );
}

export default Chats;