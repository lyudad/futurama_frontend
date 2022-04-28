import styled from 'styled-components';

export const LoginPage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    background: #e5e8ed;
`;

export const Card = styled.div`
    padding: 4rem;
    background: white;
    border-radius: 2rem;
    > * {
        margin: 0.5rem;
    }
    > h2,
    p {
        text-align: center;
    }
`;

export const ErrorSpan = styled.span`
    color: red;
    display: inline-block;
    margin-bottom: 1rem;
`;
