import styled from 'styled-components';

interface Props {
  content: string;
}

export const Container = styled.section`
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  margin: 15px 70px;
  padding: 45px 80px 30px 90px;
  background-color: #fff;
  min-width: 750px;
  border-radius: 1rem;
`;

export const Button = styled.button`
  background-color: rgba(14, 97, 222, 0.2);
  border-radius: 6px;
  padding: 10px 40px;
  box-shadow: 2px 2px 2px 2px rgba(4, 8, 14, 0.499);
  margin: 40px 20px 35px 0;
  cursor: pointer;
  font-size: 15px;
  font-weight: 400;
  border: none;
  &:hover {
    box-shadow: 2px 2px 2px 2px rgba(25, 133, 179, 0.5);
  }
  &:active {
    box-shadow: none;
}
`;

export const Heading = styled.h1`
font-weight: 600;
  font-size: 30px;
`;

export const Skill = styled.div`
   display: inline-block;
  background-color: rgba(188, 186, 186, 0.347);
  border-radius: 7px;
  margin: 10px 5px 0 0;
  padding: 7px 15px;
  font-size: 16px;
  font-weight: 500;
  
`;

export const CompanyInfo = styled.div`
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  max-width: 50%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;  
`;

export const Title = styled.h5`
  text-align: center;
  color: gray;
  margin-bottom: 3px;
  font-size: 13px;
`;

export const Info = styled.div`
font-weight: 500;
font-size: 16px;
margin: 18px 0 10px 0;
  display: flex;
  justify-content: space-between;
`;
export const InfoItem = styled.div`
  box-shadow: 2px 2px 2px 2px rgba(25, 133, 179, 0.5);
  border-radius: 6px;
  padding: 8px 30px;
  text-align: center;
  min-width: 118px;
  `;
export const Date = styled.div<Props>`
  display: inline-block;
  margin: 35px 35px 0 0;
  font-size: 18px;
  font-weight: 600;
  &::before {
      content: '${(Props) => Props.content}';
      font-size: 10px;
      color: grey;
  }
  `;

export const SmallHeading = styled.h2`
  margin-top: '10px'; 
  margin-bottom: '10px'; 
  font-size: '15px';
  `;