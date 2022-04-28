import React from 'react';
import { StyledInput } from './styles';

export function Input({ Label, input, ...props }: any): JSX.Element {
    return (
        <div>
            <div>
                <label htmlFor={Label}>{Label}</label>
            </div>
            <StyledInput {...input} {...props} />
        </div>
    );
}
