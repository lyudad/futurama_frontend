import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components/header';
import { AboutUs } from './pages/aboutUs';
import { Contacts } from './pages/contacts';
import { Home } from './pages/home';
import { PasswordRecovery } from './pages/passwordRecovery';
import { PasswordNotification } from './pages/passwordNotification';
import { PasswordMakeNew } from './pages/passwordMakeNew';

function App(): JSX.Element {
    return (
        <>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route
                        path="/password_recovery"
                        element={<PasswordRecovery />}
                    />
                    <Route
                        path="/password_reset"
                        element={<PasswordNotification />}
                    />
                    <Route
                        path="/password_make_new"
                        element={<PasswordMakeNew />}
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
