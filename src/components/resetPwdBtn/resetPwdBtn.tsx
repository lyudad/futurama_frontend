import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';

export function ResetPwdBtn(): JSX.Element {
    return (
        <Button type="link">
            <NavLink to="/password_recovery">Forgot password?</NavLink>
        </Button>
    );
}
