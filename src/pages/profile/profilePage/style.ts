import styled from 'styled-components';

interface Props {
    child?: boolean;
}

export const Experience = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;    
`;

export const ProfileCard = styled.div<Props>`     
    background-color: white;
    border-radius: 0.5rem;
    text-align: left;
    padding: 1rem;
    margin: 1rem 0 1rem 0;
    box-shadow:  ${props => props.child ? "1px 1px 5px 1px rgba(25, 133, 179, 0.3)" : "2px 2px 3px 2px rgba(162, 185, 187, 0.8)"};
`;

export const InfoBlock = styled.div`
    min-width: 183px;'
`;