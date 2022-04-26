import React from 'react';
import { StyledButton } from './styles';

export function Button({ children, button, ...props }: any): JSX.Element {
    return (
        <div>
            <StyledButton {...button} {...props}>
                {children}
            </StyledButton>
        </div>
    );
}
