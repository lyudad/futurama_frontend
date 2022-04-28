import styled from 'styled-components';

export const StyledInput = styled.input`
    width: ${(props) => props.width || '20'}rem;
    height: ${(props) => props.height || '3'}rem;
    margin: 0.5rem 0;
    border-radius: 0.5rem;
    border: 1px solid;
    padding-left: 0.5rem;
`;