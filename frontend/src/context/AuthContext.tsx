import { createContext, useState } from "react";

interface AuthContextProps {
    user: UserProps | null
    isAuthenticated: (type?: "user" | "admin" | undefined) => Promise<boolean>
    login: (email: string, password: string) => Promise<LoginReturnType>
    deleteUser: (hash: string) => Promise<LoginReturnType>
    update: (name?: string, email?: string, password?: string) => Promise<LoginReturnType>,
    createUser: (name: string, email: string, password: string) => Promise<LoginReturnType>
    logout: () => void,
    fetchUser: (hash?: string) => void
}

export type UserProps = {
    hash: string,
    username: string,
    email: string,
    type: "user" | "admin"
}

export type LoginReturnType = {
    statusCode: number,
    message: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const apiUrl = import.meta.env.VITE_API_URL
    const [user, setUser] = useState<UserProps | null>(null);

    function wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const logout = async() => {
        setUser(null);
        await fetch(`${apiUrl}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
    };

    const createUser = async(name: string, email: string, password: string) => {
        const req = await fetch(`${apiUrl}/api/users`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
        })

        const data = await req.json()

        if (req.ok) {
            login(data.email, password)
            await wait(3000)
            return {
                statusCode: 200,
                message: "Usuário Criado com sucesso!"
            }
        }

        if (req.status == 400) {
            return {
                statusCode: req.status,
                message: data.message
            } 
        }
        
        return {
            statusCode: req.status,
            message: "Erro ao criar o usuário, tente novamente!"
        }
    }

    const deleteUser = async(hash: string) => {
        const req = await fetch(`${apiUrl}/api/users/${hash}/delete`, {
            method: "DELETE",
            credentials: "include"
        })

        if (req.ok) {
            return {
                statusCode: 200,
                message: "Conta deletada com Sucesso!"
            }
        }

        return {
            statusCode: req.status,
            message: "Erro ao deletar a conta!"
        }
    }

    const isAuthenticated = async (type?: "user" | "admin" | undefined) => {
        try {
            if (user) {
                return true
            }

            const res = await fetch(`${apiUrl}/api/users/me`, {
                method: "GET",
                credentials: "include"
            }); 

            const data = await res.json()

            if (res.ok) {
                if (type == "admin") {
                    if (data.type == "admin") {
                        return true
                    }

                    return false
                }

                return true
            }

            return false

        } catch {
            return false
        }
    }

    const fetchUser = async (hash?: string) => {
        let res;

        if (user?.hash || hash) {
            res = await fetch(`${apiUrl}/api/users/${user?.hash || hash}`, {
                method: "GET",
                credentials: "include"
            });
        } else {
            res = await fetch(`${apiUrl}/api/users/me`, {
                method: "GET",
                credentials: "include"
            });

            const data = await res.json()

            res = await fetch(`${apiUrl}/api/users/${data.hash}`, {
                method: "GET",
                credentials: "include"
            });
        }

        if (res.ok) {
            setUser(await res.json())
        }
    };

    const update = async(name: string = "", email: string = "", password: string = "") => {
        const res = await fetch(`${apiUrl}/api/users/${user?.hash}/update`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name || null,
                email: email || null,
                password: password || null
            }),
            credentials: "include"
        });

        const data = await res.json();

        if (res.ok) {
            return {
                statusCode: 200,
                message: "Updated"
            }
        }
        
        if (res.status == 401) {
            return data
        }

        return {
            statusCode: res.status,
            message: "Sua senha deve ter no mínimo: 8 caracteres, 1 letra maiúscula, 1 número!"
        }
    }


    const login = async (email: string, password: string): Promise<LoginReturnType> => {
        const res = await fetch(`${apiUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            }),
            credentials: "include"
        });

        const data = await res.json();

        if (res.ok) {
            console.log(data)
            fetchUser()
            return {
                statusCode: 200,
                message: "Logado!"
            }
        }

        if (res.status == 401) {
            return data
        }

        return {
            statusCode: res.status,
            message: "Usuário não encontrado! Tente Novamente"
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            deleteUser,
            logout,
            update,
            createUser,
            fetchUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

