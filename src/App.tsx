import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/header';
import { AboutUs } from './pages/aboutUs';
import { Contacts } from './pages/contacts';
import { Home } from './pages/home';

function App(): JSX.Element {
    return (
        <>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
