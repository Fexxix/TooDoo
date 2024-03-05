import Navbar from "./SignupComponents/Navbar";
import Home from "./SignupComponents/Home";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SignUp from "./SignupComponents/SignUp";
import Login from "./SignupComponents/Login";
import Verify from "./SignupComponents/Verify";
import { useAuth } from "./Context/AuthProvider";
// import { ToDo } from "./TodoComponents/TodoLists"
import TooDoos from "./TooDoos";

export default function App() {
  const { pathname } = useLocation();
  const { user } = useAuth()!;

  return (
    <>
      {pathname === "/" && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/toodoos" /> : <Home />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/toodoos" /> : <SignUp />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/toodoos" /> : <Login />}
        />
        <Route path="/verify/:token" element={<Verify />} />
        <Route
          path="/toodoos"
          element={!user ? <Navigate to="/" /> : <TooDoos />}
        />
      </Routes>
    </>
  );
}
