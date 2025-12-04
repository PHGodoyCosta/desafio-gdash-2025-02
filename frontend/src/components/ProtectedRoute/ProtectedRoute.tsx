import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "@/context/AuthContext";

type ProtectedRouteProps = {
    children: React.ReactNode,
    type?: "admin" | "user"
    route?: string
}

function ProtectedRoute({ children, route = "/login", type = "user" }: ProtectedRouteProps) {
    const navigate = useNavigate()
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        const check = async () => {
            const ok = await auth!.isAuthenticated(type);
            console.log("Is autenticated em ProtectedRoute")
            setAllowed(ok);
            setLoading(false);
        };
        check();
    }, []);

    if (loading) {
        return <div className="w-full h-full flex justify-center items-center mt-2">
            Carregando...
        </div>;
    }

    if (!allowed) {
        console.log("Usuário não autenticado!")
        navigate(route)
    }

    return children;
}

export default ProtectedRoute