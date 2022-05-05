import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { constants } from 'constants/urls';
import { useAppSelector } from 'store/hooks';
import { Home } from './pages/home';
import { SignIn } from './pages/signin';
import { PasswordRecovery } from './pages/password/recovery';
import { PasswordNotification } from './pages/password/notification';
import { PasswordMakeNew } from './pages/password/makeNew';
import { SignUp } from './pages/signup';
import { SelectRole } from './pages/selectRole';
import 'antd/dist/antd.css';

function App(): JSX.Element {
    const token = useAppSelector((state) => state.login.token);

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
                path={constants.PASSWORD_NOTOFICATION}
                element={<PasswordNotification />}
            />
            <Route
                path={constants.PASSWORD_MAKE_NEW}
                element={<PasswordMakeNew />}
            />
            <Route path={constants.SIGNUP} element={<SignUp />} />
            <Route path={constants.SIGNUP_ROLE} element={<SelectRole />} />
        </Routes>
    );
}

export default App;
