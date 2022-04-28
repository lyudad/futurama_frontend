import styled from 'styled-components';

export const StyledButton = styled.button`
    background: ${(props) => props.theme || 'white'};
    color: ${(props) => props.color || 'black'};
    width: 20rem;
    height: 3rem;
    margin: 1rem 0;
    border: 0;
    border-radius: 0.2rem;
`;
