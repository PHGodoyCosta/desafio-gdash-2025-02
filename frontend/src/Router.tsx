import { createBrowserRouter } from "react-router";
import App from "./App";
import LoginPage from "./pages/Login/LoginPage";
import CreateAccountPage from "./pages/Criar Conta/CreateAccountPage";
import ExplorarPage from "./pages/Explorar/ExplorarPage";
import Personagem from "./pages/Explorar/Personagem/Personagem";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/criar-conta",
        element: <CreateAccountPage />
    },
    {
        path: "/explorar",
        element: <ExplorarPage />
    },
    {
        path: "/explorar/personagem/:id",
        element: <Personagem />
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        )
    },
    {
        path: "/admin/dashboard",
        element: (
            <ProtectedRoute type="admin">
                <DashboardAdmin />
            </ProtectedRoute>
        )
    }
])

export default router