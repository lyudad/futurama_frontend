import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { constants } from 'constants/urls';
import { useAppSelector } from 'store/hooks';
import { setProfile } from 'store/reducers/profile';
import { useGetProfileMutation } from 'store/api/profileApi';
import { Contacts } from "pages/contacts";
import ProjectDetails from 'pages/vacancies/components/projectDetails';
import PrivateRoute from 'components/privateRoute';
import PublicRoute from 'components/publicRoute';
import  Home  from './pages/home';
import { SignIn } from './pages/signin';
import { Recovery } from './pages/password/recovery';
import { MakeNew } from './pages/password/makeNew';
import { SignUp } from './pages/signup';


function App(): JSX.Element {
    const token = useAppSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [getProfile, { data, isSuccess }] = useGetProfileMutation();

    useEffect(() => {
        if (isSuccess) 
        {            
            dispatch(setProfile(data));
        }
        else if(token) {
            getProfile({ token }); 
        }  
    }, [isSuccess, token]);

    return (
        <Routes>
            <Route path="*" element={<PrivateRoute component={Home} />}/>
            <Route path={constants.LOGIN} element={<PublicRoute restricted component={SignIn}/>} />
            <Route path={constants.PASSWORD_RECOVERY} element={<PublicRoute restricted component={Recovery}/>} />
            <Route path={constants.PASSWORD_MAKE_NEW} element={<PublicRoute restricted component={MakeNew}/>} />
            <Route path={constants.SIGNUP} element={<PublicRoute restricted component={SignUp}/>} />
            <Route path="vacancies/:id" element={<ProjectDetails/>} />
            <Route path={constants.USER_CONTACTS} element={<PrivateRoute component={Contacts} />}/>        
        </Routes>
    );
}

export default App;