import styled from 'styled-components';
import { fonts } from 'constants/fonts';
import { colors } from 'constants/colors';

export const Container = styled.div`
    font-family: Inter;
    font-weigth: normal;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    min-height: 100vh;
    background: #e5e5e5;
`;

export const WorkField = styled.div`
    padding: 3rem;
    padding-bottom: 25px;
    width: 100%;
    min-height: 93vh;
    background: white;
    border-radius: 2rem;
    > * {
        margin: 1rem;
    }
    > h2,
    p {
        text-align: center;
    }
    box-shadow: 10px 2px 6px rgba(0, 0, 0, 0.12),
        0px 2px 6px rgba(0, 0, 0, 0.14), 0px 2px 6px rgba(0, 0, 0, 0.2);

    
`;

export const CardWrapper = styled.div`
    padding:1.5rem;
    padding-bottom: 25px;
    width: 95%;
    height: 340px;
    background: white;
    border-radius: 2rem;
    > * {
        margin: 0.5rem;
    }
    > h2,
    p {
        text-align: left;
    }
    box-shadow: 10px 2px 6px rgba(0, 0, 0, 0.12),
        0px 2px 6px rgba(0, 0, 0, 0.14), 0px 2px 6px rgba(0, 0, 0, 0.2);
    margin: 0 auto;
    &:hover {
        background: ${colors.VACANCIES_FOCUS};
        box-shadow: 4px 1px 11px 3px rgba(0,0,0,0.75)
      }
`;

export const Header2 = styled.h2`
font-size: ${fonts.FONT_SIZE_LABELS};
font-weight: ${fonts.FONT_WEIGHT_BOLD};
margin-bottom: 40px;
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

