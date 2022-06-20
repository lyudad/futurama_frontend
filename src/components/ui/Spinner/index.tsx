import React from 'react';
import { Spin } from './styles';

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
            <Spin />
        </div>
    );
}
