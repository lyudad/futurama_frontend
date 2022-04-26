import React from 'react';
import { Layout } from 'antd';

import { SignUpForm } from '../../components/sign-up-page';

import 'antd/dist/antd.css';

const { Content } = Layout;

export function Home(): JSX.Element {
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
            }}
        >
            <h1>Create an account</h1>
            <SignUpForm />
        </Content>
    );
}
