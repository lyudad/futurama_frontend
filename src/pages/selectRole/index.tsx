import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Button } from 'antd';

import { BACKGROUND_COLOR } from 'constants/colors';
import { roleSelectionPageLanguage } from 'constants/languages/english';

const { Content } = Layout;

export function SelectRole(): JSX.Element {
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                background: BACKGROUND_COLOR,
                minHeight: 280,
            }}
        >
            <h1>WHO YOU ARE?</h1>
            <section>
                <NavLink to="/profile">
                    <Button type="primary" htmlType="submit">
                        {roleSelectionPageLanguage.freelancerButtonText}
                    </Button>
                </NavLink>
                <NavLink to="/profile">
                    <Button type="primary" htmlType="submit">
                        {roleSelectionPageLanguage.jobOwnerText}
                    </Button>
                </NavLink>
            </section>
        </Content>
    );
}
