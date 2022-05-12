import React from 'react';
import { StyledButton, StyledDiv } from './styles';

export function Button({ ...props }): JSX.Element {
    
    return (
        <StyledDiv>
            <StyledButton {...props}>
                {props.children}
            </StyledButton>
        </StyledDiv>
    );
}
