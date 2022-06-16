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
import Settings from 'pages/settings';
import { MyProposals } from 'pages/myProposals';
import { MyJobs } from 'pages/myJobs';
import { Talents } from 'pages/talents';
import { Contracts } from 'pages/contracts';
import PublicProfile from 'pages/talents/PublicProfile';
import { Invites } from 'pages/myProposals/invites';

function Home(): JSX.Element {
    const role = useAppSelector((state) => state.auth.user?.role);

    return (
        <>
            {role === variables.freelancer ? <HeaderFreelancer /> : <HeaderJobOwner />}
            <div className='container'>
                <Routes>
                    <Route path="*" element={<PrivateRoute component={Profile} />} />
                    <Route path={constants.SETTINGS} element={<PrivateRoute component={Settings} />} />
                    <Route path={constants.MY_PROPOSALS} element={<PrivateRoute component={MyProposals} />} />
                    <Route path={constants.MY_JOBS} element={<PrivateRoute component={MyJobs} />} />
                    <Route path={constants.VACANCIES} element={<PrivateRoute component={Vacancies} />} />
                    <Route path={constants.VACANCY_DETAILS} element={<PublicRoute restricted={false} component={ProjectDetails} />} />
                    <Route path={constants.USER_CONTACTS} element={<PublicRoute restricted={false} component={Contacts} />} />
                    <Route path={constants.TALENTS} element={<PrivateRoute component={Talents} />} />
                    <Route path={constants.CONTRACTS} element={<PublicRoute restricted={false} component={Contracts} />} />
                    <Route path={constants.PROFILE} element={<PublicRoute restricted={false} component={PublicProfile} />} />
                    <Route path={constants.INVITES_TO_INTERVIEW} element={<PrivateRoute component={Invites} />} />
                </Routes>
            </div>
        </>
    );
}

export default Home;
