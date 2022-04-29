import React from 'react';
import { Layout } from 'antd';

import { SignUpForm } from 'components/sign-up/signUpForm';
import { BACKGROUND_COLOR } from 'constants/colors';

const { Content } = Layout;

export function SignUp(): JSX.Element {
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                background: BACKGROUND_COLOR,
                minHeight: 280,
            }}
        >
            <h1>Create an account</h1>
            <SignUpForm />
        </Content>
    );
}
