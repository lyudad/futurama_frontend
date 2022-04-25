import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/signup';

function App(): JSX.Element {
    return (
        <div className="container">
            <Routes>
                <Route path="/signup" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
