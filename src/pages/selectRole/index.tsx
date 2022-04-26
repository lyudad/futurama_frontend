import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Button } from 'antd';

const { Content } = Layout;

export function SelectRole(): JSX.Element {
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
            }}
        >
            <h1>WHO YOU ARE?</h1>
            <section>
                <NavLink to="/profile">
                    <Button type="primary" htmlType="submit">
                        Freelancer
                    </Button>
                </NavLink>
                <NavLink to="/profile">
                    <Button type="primary" htmlType="submit">
                        Job owner
                    </Button>
                </NavLink>
            </section>
        </Content>
    );
}
