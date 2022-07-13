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
    border: none;
    font-weight: 600;
    font-size: 15px;
    border-radius: 0.2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 1px 4px 0px rgba(4, 8, 14, 0.5);
    &:hover {
        box-shadow: 2px 2px 5px 1px rgba(4, 8, 14, 0.5);  
    }
    &:active {
        box-shadow: none;
    } 
`;

export const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
