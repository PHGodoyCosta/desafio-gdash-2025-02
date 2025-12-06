import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

type ConfirmRouteType = {
    children: React.ReactNode,
    route?: string
}

function ConfirmRoute({ children, route = "/login" }: ConfirmRouteType) {
    const apiUrl = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const check = async () => {
            const token = searchParams.get("token");

            if (!token) {
                return setLoading(false);
            }

            const res = await fetch(`${apiUrl}/api/newsletter/confirm?token=${token}`, {
                method: "GET",
                credentials: "include"
            })

            if (!res.ok) {
                return setLoading(false);
            }

            setAllowed(true);
            setLoading(false);
        };
        check();
    }, []);

    if (loading) {
        return <div className="w-full h-full flex justify-center items-center mt-2">
            Verificando a confirmação...
        </div>;
    }

    if (!allowed) {
        console.log("[Log] Usuário não autenticado!")
        navigate(route)
    }

    return children;
}

export default ConfirmRoute
