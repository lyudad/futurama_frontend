import styled from 'styled-components';

export const SignupPage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
`;

export const Card = styled.div`
    padding: 2rem 4rem;
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

export const FuturamaText = styled.h2`
    font-size: 2.5rem;
    margin-bottom: 0;
    line-height: normal;
`;

export const FindADreamJob = styled.p`
    width: 80%;
    margin: 0;
    text-align: right !important;
`;

export const ImageIcons = styled.div`
    width: 1rem;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    div {
        margin: 0 0.2rem;
    }
    a {
        color: white;
    }
`;

export const Role = styled.div`
    display: flex;
    justify-content: space-around;
`;
