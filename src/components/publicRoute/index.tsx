import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

interface Props {
    component: React.ComponentType;
    restricted: boolean;
}
function PublicRoute({component: Component, restricted, ...props}: Props): JSX.Element{
    const token = useAppSelector((state) => state.auth.token);
    return token && restricted ? <Navigate to='/' /> : <Component {...props} /> ;
}

export default PublicRoute;