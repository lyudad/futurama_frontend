import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { constants } from 'constants/urls';
import { useAppSelector } from 'store/hooks';
import { Vacancies } from 'pages/vacancies';
import PrivateRoute from 'components/privateRoute';
import PublicRoute from 'components/publicRoute';
import Profile from 'pages/profile';
import { Contacts } from "pages/contacts";
import ProjectDetails from 'pages/vacancies/components/projectDetails';
import { HeaderFreelancer, HeaderJobOwner } from 'components/header';
import { variables } from 'constants/variables';

function Home(): JSX.Element {
    const role = useAppSelector((state) => state.auth.user?.role);

    return (
        <>
        {role === variables.freelancer ? <HeaderFreelancer/>  : <HeaderJobOwner/>}
        <Routes>
            <Route path={constants.VACANCIES} element={<PrivateRoute component={Vacancies} />}/>
            <Route path={constants.VACANCY_DETAILS} element={<PublicRoute restricted={false} component={ProjectDetails}/>} />
            <Route path={constants.USER_CONTACTS} element={<PublicRoute restricted={false} component={Contacts}/>} />
            <Route path="*" element={<PrivateRoute component={Profile} />} />
        </Routes>
        </>
    );
}

export default Home;
