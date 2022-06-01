import React from 'react';
import { Spin } from 'antd';

export function Spinner(): JSX.Element {
    return (
        <Spin size="large"
            style={{ margin: '20% auto', display: 'block' }} />
    );
}
