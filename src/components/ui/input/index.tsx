import React from 'react';
import { StyledInput } from './styles';

export function Input({ ...props }): JSX.Element {
    
    return (
        <div>
            <div>
                <label htmlFor={props.Label}>{props.Label}</label>
            </div>
            <StyledInput {...props} />
        </div>
    );
}
