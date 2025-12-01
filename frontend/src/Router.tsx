import { createBrowserRouter } from "react-router";
import App from "./App";
import LoginPage from "./pages/Login/LoginPage";
import CreateAccountPage from "./pages/Criar Conta/CreateAccountPage";

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
    }
])

export default router