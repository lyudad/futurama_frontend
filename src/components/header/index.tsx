import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavContainer } from './styles';

export function Header(): JSX.Element {
    return (
        <NavContainer>
            <div>
                <NavLink to="/">Home</NavLink>
            </div>
            <div>
                <NavLink to="/contacts">Contacts</NavLink>
            </div>
            <div>
                <NavLink to="/aboutus">About us</NavLink>
            </div>
        </NavContainer>
    );
}
