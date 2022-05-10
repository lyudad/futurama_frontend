import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { colors } from 'constants/colors';

const { Content } = Layout;

export function SelectRole(): JSX.Element {
    const { t } = useTranslation();
    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                background: colors.BACKGROUND_COLOR,
                minHeight: 280,
            }}
        >
            <h1>{t('RoleSelectionPage.whoAreYou')}</h1>
            <section>
                <NavLink to="/profile">
                    <Button type="primary" htmlType="submit">
                        {t('RoleSelectionPage.freelancer')}
                    </Button>
                </NavLink>
                <NavLink to="/profile">
                    <Button type="primary" htmlType="submit">
                        {t('RoleSelectionPage.jobOwner')}
                    </Button>
                </NavLink>
            </section>
        </Content>
    );
}
