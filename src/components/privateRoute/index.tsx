import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { constants } from 'constants/urls';

interface Props {
    component: React.ComponentType;
}
function PrivateRoute({component: Component, ...props}: Props): JSX.Element{
    const token = useAppSelector((state) => state.auth.token);
    return token ? <Component {...props} /> : <Navigate to={constants.LOGIN} />
}

export default PrivateRoute;