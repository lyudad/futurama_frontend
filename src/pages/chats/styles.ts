import styled from "styled-components";

interface Props {
    author?: string;
    created: string;
}

interface ChatProps {
    chosen?: boolean;
}

export const Container = styled.section`
  display: flex;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  margin: 0px 50px;
  padding: 25px;
  background-color: #fff;
  text-align: left;  
  min-height: 600px;
`;

export const ChatsContainer = styled.div`
  border-right: 2px solid #E5E4E2;
  flex: 3 2.5 100%;
`;

export const ChatWrapper = styled.div<ChatProps>`
    background-color: ${(Props) => Props.chosen ? "honeydew" : "white"};
    padding-top: 15px;
    padding-left: 15px;
    height: 80px;
    padding-bottom: 8px;
    border-bottom: 1px solid #E5E4E2;
    transition: all 0.4s ease;
    cursor: pointer;
    &:hover {
        background-color: honeydew;
        border-bottom: 1px solid grey;
    }

`;

export const MessageContainer = styled.div`
    flex: 1 1 100%;
    padding: 25px;
    max-height: 600px;
    overflow-y: scroll;
    -ms-overflow-style: none;  
    scrollbar-width: none;    
    &::-webkit-scrollbar {
        display: none;
}
`;

export const Message = styled.div<Props>`
    min-width: 58px;    
    font-size: 13px;
    padding: 11px 15px;
    border-radius: 10px;
    position: relative;
    margin: 5px 0;
    min-height: 55px;
        &::before {
            content: '';
            display: ${(Props) => Props.author ? "block" : "none"};
            position: absolute;
            width: 10px;
            height: 10px;
            top: 20px;
            left: ${(Props) => Props.author === 'me' ? "none" : "-5px"};
            right: ${(Props) => Props.author === 'me' ? "-5px" : "none"};
            background-color: inherit;
            transform: rotate(45deg);
}
        &::after {
            content: '${(Props) => Props.created}';
            display: block; 
            font-size: 8px;
            position: absolute;
            bottom: 2px;
            right: 15px;                     
}
${Props => {
        if (!Props.author) {
            return `
            width: 100%;
            background-color: #E5E4E2;
            text-align: center;
            min-height: 0;
            margin: 15px 0;       
    `;
        } if (Props.author === 'me') {
            return `
            background-color: #E0FFFF;       
    `;
        }
        return `
            background-color: #d5eafb;      
    `;
    }}  
`;

export const Button = styled.button`  
  margin-top: -8px;
  background-color: rgba(14, 97, 222, 0.2);
  border-radius: 6px;
  padding: 8px 40px;
  box-shadow: 2px 2px 2px 1px rgba(4, 8, 14, 0.5);  
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  border: none;
  &:hover {
    box-shadow: 2px 2px 2px 1px rgba(25, 133, 179, 0.5);
  }
  &:active {
    box-shadow: none;
  }
 `;

export const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
 `;