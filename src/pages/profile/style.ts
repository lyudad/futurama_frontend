import styled from 'styled-components';

export const ProfilePhoto = styled.div`
    width: 7rem;
    img {
        border-radius: 100%;
    }
`;

export const UserInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
        font-size: 1.8rem;
        font-weight: 700;
        margin-left: 1rem;
    }
`;

export const ProfileCard = styled.div`
    width: 60%;
    border: 1px solid black;
    border-radius: 1rem;
    text-align: left;
    padding: 1rem;
    margin: 1rem;
    box-shadow: 0 14px 28px rgba(238, 239, 242, 1),
        0 10px 10px rgba(238, 239, 242, 1);
`;

export const UserProfile = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
