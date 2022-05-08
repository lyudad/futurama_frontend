import styled from 'styled-components';

export const Container = styled.div`
    font-family: Inter;
    font-style: normal;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 55px;
    height: 100vh;
    background: #e5e5e5;
`;

export const Card = styled.div`
    padding: 2rem;
    padding-bottom: 25px;
    height: 90vh;
    background: white;
    border-radius: 2rem;
    > * {
        margin: 0.5rem;
    }
    > h2,
    p {
        text-align: center;
    },
`;

export const Header1 = styled.h2`
    font-weight: 500;
    font-size: 60px;
    line-height: 73px;
    margin: 0;
`;

export const Header2 = styled.h2`
    font-weight: 200;
    font-size: 20px;
    line-height: 24px;
    margin-left: 200px;
    margin-top: -10px;
    margin-bottom: 73px;
`;