import React from 'react';
import { Spin } from './styles';

export function Spinner(): JSX.Element {
    return (
        <div
            style={{
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Spin />
        </div>
    );
}
