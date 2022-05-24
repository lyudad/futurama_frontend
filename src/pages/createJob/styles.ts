import styled from "styled-components";

type TextTypes = {
  fontSize: string;
  fontWeight: string;
  color: string;
  margin: string;
  textAlign: string;
};

type WrapperTypes = {
  margin: string;
  width: string;
  display: string;
};

type ButtonTypes = {
  width: string;
  height: string;
  color: string;
  background: string;
  fontSize: string;
  fontWeight: string;
  margin: string;
};

type SeparatorTypes = {
  margin: string;
};

export const Content = styled.div`
  max-width: 1100px;
  display: flex;
  margin: 0px auto;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  background: white;
`;

export const RightBlock = styled.div`
  width: 40%;
  background: #4C5151;
`;

export const LeftBlock = styled.div`
  width: 60%;
`;

export const Block = styled.div`
  width: 85%;
  margin: 0px auto;
`;

export const Text = styled.p<TextTypes>`
  font-size: ${props => props.fontSize}px;
  font-weight: ${props => props.fontWeight};
  color: ${props => props.color};
  margin: ${props => props.margin};
  text-align: ${props => props.textAlign};
`;

export const Wrapper = styled.div<WrapperTypes>`
  width: ${props => props.width};
  margin: ${props => props.margin};
  display: ${props => props.display};
`;

export const Label = styled.label`
  font-size: 13px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 5px;
  height: 30px; 
  outline: none;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 12px;

  :focus {
    transition : .3s;
    box-shadow: 0 0 4px #75CCD2;
    border: 1px solid #75CCD2;
  }
`;

export const Select = styled.select`
   width: 100%;
   padding: 9px;
   background: none;
   outline: none;
   border: 1px solid gray;
   border-radius: 5px;
   font-size: 12px;
`;

export const Option = styled.option``;


export const TextArea = styled.textarea`
  width: 101%;
  height: 150px;
  resize: none;
`;

export const Button = styled.button<ButtonTypes>`
   width: ${props => props.width}px;
   height: ${props => props.height}px;
   color: ${props => props.color};
   background: ${props => props.background};
   font-size: ${props => props.fontSize}px;
   font-weight: ${props => props.fontWeight};
   margin: ${props => props.margin};
   outline: none;
   border: none;
   border-radius: 5px;
   cursor: pointer;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   padding: 0px 5px 0px 5px;

   :disabled {
      background: gray;
      opacity: .6;
      cursor: not-allowed;
   }

   :hover {
      opacity: .7;
      transition : .3s;
   }
`;

export const Form = styled.form``;

export const Image = styled.img`
  width: 100px;
`;

export const Separator = styled.hr < SeparatorTypes > `
   margin: ${props => props.margin}; 
   height: 1px;
   opacity: .4;
   width:  70%;
   background: darkgray;
`;

