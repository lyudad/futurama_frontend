import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Home } from './pages/home';
import { SignIn } from './pages/signin';

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
        </Routes>
    );
}

export default App;
