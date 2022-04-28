import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Home } from './pages/home';
import { SignIn } from './pages/signin';
import { PasswordRecovery } from './pages/passwordRecovery';
import { PasswordNotification } from './pages/passwordNotification';
import { PasswordMakeNew } from './pages/passwordMakeNew';

function App(): JSX.Element {
    const token = localStorage.getItem('token');
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
            <Route path="/password_recovery" element={<PasswordRecovery />} />
            <Route path="/password_reset" element={<PasswordNotification />} />
            <Route path="/password_make_new" element={<PasswordMakeNew />} />
        </Routes>
    );
}

export default App;
