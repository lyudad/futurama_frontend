import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SignUp } from 'pages/signup';
import { SelectRole } from 'pages/selectRole';

import 'antd/dist/antd.css';

function App(): JSX.Element {
    return (
        <div className="container">
            <Routes>
                <Route path="/signup" element={<SignUp />} />
            </Routes>
            <Routes>
                <Route path="/signup/role" element={<SelectRole />} />
            </Routes>
        </div>
    );
}

export default App;
