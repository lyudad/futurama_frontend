import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import 'antd/dist/antd.min.css';

export function GoSignIn(): JSX.Element {
    return (
        <Button type="link">
            <NavLink to="/">
                Already have an account? Click to go to login page
            </NavLink>
        </Button>
    );
}
