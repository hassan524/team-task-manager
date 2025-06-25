import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Start from "./pages/Start";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />} >
          <Route index element={<Start />} />
          <Route path="auth/signup" element={<SignUp />} />
          <Route path="auth/login" element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
