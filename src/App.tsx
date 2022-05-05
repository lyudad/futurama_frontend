import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

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
                path="/"
                element={token ? <Home /> : <Navigate to="/login" />}
            />
            <Route
                path="/login"
                element={!token ? <SignIn /> : <Navigate to="/" />}
            />
            <Route path="/password/recovery" element={<PasswordRecovery />} />
            <Route
                path="/password/notification"
                element={<PasswordNotification />}
            />
            <Route path="/password/make_new" element={<PasswordMakeNew />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signup/role" element={<SelectRole />} />
        </Routes>
    );
}

export default App;
