import styled from 'styled-components';
import { fonts } from 'constants/fonts';
import { colors } from 'constants/colors';

export const Container = styled.div`
    font-family: ${fonts.FONT_FAMILY_BASE};   
    display: flex;
    padding: 20px;    
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const VacanciesContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
`;

export const CardWrapper = styled.div`
    padding: 1.5rem;
    padding-bottom: 25px;   
    background: white;
    border-radius: 15px;
    > h2,
    p {
        text-align: left;
    }
    box-shadow: 10px 2px 6px rgba(0, 0, 0, 0.12),
        0px 2px 6px rgba(0, 0, 0, 0.14), 0px 2px 6px rgba(0, 0, 0, 0.2);
    margin: 0 auto 20px auto;    
    transition: box-shadow 200ms ease;
    &:hover {
        background: ${colors.VACANCIES_FOCUS};
        box-shadow: 4px 1px 11px 3px rgba(0,0,0,0.75)
      }
`;

export const Header2 = styled.h2`
    font-size: ${fonts.FONT_SIZE_LABELS};
    font-weight: ${fonts.FONT_WEIGHT_BOLD};
    margin-bottom: 30px;
`;
export const Header3 = styled.h3`
    font-size: ${fonts.FONT_SIZE_MEDIUM};
    font-weight: ${fonts.FONT_WEIGHT_BOLD};
    text-align: left;
    &:nth-child(4) {
        margin-bottom: 25px;
    }
`;
export const Header4 = styled.h4`
    font-size: ${fonts.FONT_SIZE_SMALL};
    font-weight: ${fonts.FONT_WEIGHT_BOLD};
    text-align: left;
`;

export const Button = styled.button`
    width: 150px;
    height: 43px;
    border-radius: 10px;
    border: none;
    background-color: rgba(14, 97, 222, 0.2);
    font-size: 15px;
    font-weight: 400;
    text-transform: uppercase;
    box-shadow: 2px 2px 5px 0px rgba(4, 8, 14, 0.5);
    &:hover {
        box-shadow: 2px 2px 5px 0px rgba(25, 133, 179, 0.5);  
    }
    &:active {
        box-shadow: none;
    } 
`;