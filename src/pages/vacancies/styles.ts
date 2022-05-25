import styled from 'styled-components';
import { fonts } from 'constants/fonts';
import { colors } from 'constants/colors';

export const Container = styled.div`
    font-family: ${fonts.FONT_FAMILY_BASE};
    font-weigth: ${fonts.FONT_WEIGHT_BASE};
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 7px;
    min-height: 100vh;
`;

export const SkillsContainer = styled.div`
    display: flex;
    flex-direction: row;
`

export const Skill = styled.div`
    margin-right: 5px;
    padding: 5px;
    border-radius: 30%;
    background: ${colors.VACANCIES_FOCUS};
`

export const CardWrapper = styled.div`
    padding: 1.5rem;
    padding-bottom: 25px;   
    background: white;
    border-radius: 2rem;
    > h2,
    p {
        text-align: left;
    }
    box-shadow: 10px 2px 6px rgba(0, 0, 0, 0.12),
        0px 2px 6px rgba(0, 0, 0, 0.14), 0px 2px 6px rgba(0, 0, 0, 0.2);
    margin: 0 auto 20px auto;
    transition: background 250ms ease;
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
`
export const Header3 = styled.h3`
font-size: ${fonts.FONT_SIZE_MEDIUM};
font-weight: ${fonts.FONT_WEIGHT_BOLD};
text-align: left;
&:nth-child(4) {
    margin-bottom: 25px;
}
`
export const Header4 = styled.h4`
font-size: ${fonts.FONT_SIZE_SMALL};
font-weight: ${fonts.FONT_WEIGHT_BOLD};
text-align: left;
`

