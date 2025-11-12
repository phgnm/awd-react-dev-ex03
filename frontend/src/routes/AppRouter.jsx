import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AccountPage from "../pages/AccountPage";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        
            <Route element={<ProtectedRoute />}>
                <Route path="/account" element={<AccountPage />} />
            </Route>
        </Routes>
    )
}