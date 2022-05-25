import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { constants } from 'constants/urls';
import { useAppSelector } from 'store/hooks';
import { Vacancies } from 'pages/vacancies';
import PrivateRoute from 'components/privateRoute';
import Profile from 'pages/profile';
import { HeaderFreelancer, HeaderJobOwner } from 'components/header';
import { variables } from 'constants/variables';
import { Contacts } from 'pages/contacts';

function Home(): JSX.Element {
    const role = useAppSelector((state) => state.auth.user?.role);

    return (
        <>
        {role === variables.freelancer ? <HeaderFreelancer/>  : <HeaderJobOwner/>}
        <Routes>
            <Route path={constants.VACANCIES} element={<PrivateRoute component={Vacancies} />}/>
            <Route path="*" element={<PrivateRoute component={Profile} />} />
            <Route path={constants.USER_CONTACTS} element={<PrivateRoute component={Contacts} />}/>        
        </Routes>
        </>
    );
}

export default Home;
