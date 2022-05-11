import React from 'react';
import { StyledButton, StyledDiv } from './styles';

export function Button({ children, button, ...props }: any): JSX.Element {
    return (
        <StyledDiv>
            <StyledButton {...button} {...props}>
                {children}
            </StyledButton>
        </StyledDiv>
    );
}
