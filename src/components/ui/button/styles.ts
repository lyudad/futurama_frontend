import styled from 'styled-components';

interface Props {
    width?: string;
    height?: string;
    margin?: string;
}
export const StyledButton = styled.button<Props>`
    background: ${(props) => props.theme || 'white'};
    color: ${(props) => props.color || 'black'};
    width: ${(props) => props.width || '20'}rem;
    height: ${(props) => props.height || '2.5'}rem;
    margin: ${(props) => props.margin || '0'}rem 0;
    border: 0;
    border-radius: 0.2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
