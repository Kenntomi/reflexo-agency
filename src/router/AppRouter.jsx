import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Admin/Dashboard";
import Profile from "../pages/Admin/Profile";
import Users from "../pages/Admin/Users";
import RegisterUser from "../pages/Admin/RegisterUser";
import Settings from "../pages/Admin/Settings";
import Sidebar from "../components/Sidebar";
import Register from "../pages/Register";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <div style={{ display: "flex" }}>
              <Sidebar />
              <div style={{ flex: 1, padding: "20px" }}>
                <Routes>
                  <Route path="" element={<Dashboard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="users" element={<Users />} />
                  <Route path="register" element={<RegisterUser />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </div>
            </div>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}