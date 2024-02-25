import Navbar from "./Navbar";
import Home from "./Home";
import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Verify from "./Verify";
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
