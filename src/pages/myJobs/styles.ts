import styled from "styled-components";

export const Message = styled.div`
    background-color: #d5eafb;
    color: #282c34;
    padding: 16px;
    width: 80%;
    border-radius: 15px;
    position: relative;
    margin: 5px 12px;
    min-height: 50px;
        &::before {
        content: '';
        display: block;
        position: absolute;
        width: 15px;
        height: 15px;
        top: 42px;
        left: -7px;
        background-color: #d5eafb;
        transform: rotate(45deg);
}
`;

