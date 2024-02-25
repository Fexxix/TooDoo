import Navbar from "./SignupComponents/Navbar";
import Home from "./SignupComponents/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./SignupComponents/SignUp";
import Login from "./SignupComponents/Login";
import Verify from "./SignupComponents/Verify";
import TooDoos from "./TooDoos";

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/toodoos" element={<TooDoos />} />
      </Routes>
    </>
  );
}
