import React from 'react';
import { Spin } from 'antd';

export function Spinner(): JSX.Element {
    return (
        <div
            style={{
                height: '85vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Spin
                size="large"
                style={{
                    display: 'block',
                }}
            />
        </div>
    );
}
