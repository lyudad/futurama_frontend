import styled from 'styled-components';
import { colors } from 'constants/colors';
import { fonts } from 'constants/fonts';
import { NavLink as BaseNavLink } from "react-router-dom";

export const NavLink = styled(BaseNavLink)`
    font-size: ${fonts.FONT_SIZE_LARGE};
    color: ${colors.NAVLINK_HEADER_COLOR};
    &.active {
    color: ${colors.BUTTON_COLOR_BASE};
  }
`;


export const NavContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 65px;
    padding: 5px;
    width: 100%;
    border-bottom: 3px solid ${colors.BACKGROUND_COLOR};
    font-size: ${fonts.FONT_SIZE_MEDIUM};
    > *{
        color: ${colors.NAVLINK_HEADER_COLOR};
    }
`;
