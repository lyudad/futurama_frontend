import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Navigate, Route, Routes } from 'react-router-dom';

import { constants } from 'constants/urls';
import { useAppSelector } from 'store/hooks';
import { setProfile } from 'store/reducers/profile';
import { useGetProfileMutation } from 'store/api/profileApi';
import { Home } from './pages/home';
import { SignIn } from './pages/signin';
import { PasswordRecovery } from './pages/password/recovery';
import { PasswordMakeNew } from './pages/password/makeNew';
import { SignUp } from './pages/signup';

function App(): JSX.Element {
    const token = useAppSelector((state) => state.login.token);
    const dispatch = useDispatch();
    const [getProfile, { data, isSuccess }] = useGetProfileMutation();

    useEffect(() => {
        getProfile({ token });
        if (isSuccess) {
            dispatch(setProfile(data));
        }
    }, [token, isSuccess]);

    return (
        <Routes>
            <Route
                path={constants.HOME}
                element={token ? <Home /> : <Navigate to={constants.LOGIN} />}
            />
            <Route
                path={constants.LOGIN}
                element={!token ? <SignIn /> : <Navigate to={constants.HOME} />}
            />
            <Route
                path={constants.PASSWORD_RECOVERY}
                element={<PasswordRecovery />}
            />
            <Route
                path={constants.PASSWORD_MAKE_NEW}
                element={<PasswordMakeNew />}
            />
            <Route path={constants.SIGNUP} element={!token ? <SignUp /> : <Navigate to={constants.HOME} />} />
        </Routes>
    );
}

export default App;
