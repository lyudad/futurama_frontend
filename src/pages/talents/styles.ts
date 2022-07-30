import styled from 'styled-components';

export const CardWrapper = styled.div`
    border-radius: 15px;
    padding: 1.5rem; 
    background: white;  
    > h2,
    p {
        text-align: left;
    }
    box-shadow: 10px 2px 6px rgba(0, 0, 0, 0.12),
        0px 2px 6px rgba(0, 0, 0, 0.14), 0px 2px 6px rgba(0, 0, 0, 0.2);
    margin: 20px auto 0px auto;    
    transition: box-shadow 200ms ease;
    &:hover {
     
        box-shadow: 4px 1px 11px 3px rgba(0,0,0,0.75)
      }
`;