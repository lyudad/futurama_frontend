import styled from 'styled-components';

export const SettingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background: white;
    border-radius: 3rem;
    > div {
        margin-top: 2rem;
    }
`;

export const Part = styled.div`
    width: 70%;
    display:flex;
    align-items: center;
    justify-content: space-between;
`

export const Select = styled.select`
    width: 15rem;
    padding: 0.4rem;
    border-radius: 0.5rem;
`

export const Experience = styled.div`
    border-radius: 0.3rem;
    border: black solid 1px;
    padding: 1rem;
`

export const EducationContainer = styled.div`
    border-radius: 0.3rem;
    border: black solid 1px;
    padding: 1rem;
`

export const PartStart = styled.div`
    width: 70%;
    display:flex;
    justify-content: space-between;
`

export const Modal = styled.div`
    position: fixed;
    background: white;
`

export const CloseModal = styled.div`
    margin: 0.4rem;
    position: absolute;
    right: 0;
    top: 0;
`
