import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { useAppSelector } from "store/hooks";
import { Home } from "./pages/home";
import { SignIn } from "./pages/signin";
import { PasswordRecovery } from "./pages/passwordRecovery";
import { PasswordNotification } from "./pages/passwordNotification";
import { PasswordMakeNew } from "./pages/passwordMakeNew";
import { SignUp } from "./pages/signup";
import { SelectRole } from "./pages/selectRole";
import { Settings } from "./pages/settings";
import "antd/dist/antd.min.css";

function App(): JSX.Element {
  const token = useAppSelector((state) => state.login.token);

  return (
    <Routes>
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
      <Route
        path="/login"
        element={!token ? <SignIn /> : <Navigate to="/" />}
      />
      <Route path="/password_recovery" element={<PasswordRecovery />} />
      <Route path="/password_reset" element={<PasswordNotification />} />
      <Route path="/password_make_new" element={<PasswordMakeNew />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/role" element={<SelectRole />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
