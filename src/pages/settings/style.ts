import styled from 'styled-components';

export const SettingsContainer = styled.div`
    border-radius: 15px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 45px 0 30px 0;
    background: white;   
    > div {
        margin-top: 2rem;
    }
`;

export const Part = styled.div`
    width: 70%;
    display:flex;
    align-items: center;
    justify-content: space-between;
`;

export const Select = styled.select`
    width: 15rem;
    padding: 0.4rem;
    border-radius: 1rem;
`;

export const Experience = styled.div`
    border-radius: 0.3rem;
    border: black solid 1px;
    padding: 1rem;
    margin-top: 1rem;
`;

export const EducationContainer = styled.div`
    border-radius: 0.3rem;
    border: black solid 1px;
    padding: 1rem;
    margin-top: 1rem;
`;

export const PartStart = styled.div`
    width: 70%;
    display:flex;
    justify-content: space-between;
`;

export const Modal = styled.div`
    position: fixed;
    z-index: 100;
    background: white;
`;

export const CloseModal = styled.div`
    margin: 0.4rem;
    position: absolute;
    right: 0;
    top: 0;
`;
