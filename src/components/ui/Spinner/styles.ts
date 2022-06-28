import styled from 'styled-components';

export const Spin = styled.button`
  border: 10px solid gainsboro;
  border-top: 10px solid transparent;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;
  background: transparent;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
`;
