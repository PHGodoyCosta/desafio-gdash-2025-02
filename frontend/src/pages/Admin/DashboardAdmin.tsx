import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import PageTemplate from "@/PageTemplates/PageTemplate"
import { useState, useEffect, useContext } from "react"
import { Toaster, toast } from "sonner"
import { AuthContext } from "@/context/AuthContext"

type AllUsersType = {
    name: string,
    email: string,
    type: string,
    hash: string
}

function DashboardAdmin() {
    const auth = useContext(AuthContext)
    const apiUrl = import.meta.env.VITE_API_URL
    const [allUsers, setAllUsers] = useState<AllUsersType[]>([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async() => {
        const res = await fetch(`${apiUrl}/api/users/all`, {
            method: "GET",
            credentials: "include"
        })

        if (!res.ok) {
            return toast.error("Erro! Tente novamente mais tarde!")
        }

        const data = await res.json()
        const newUsers: AllUsersType[] = []
        data.map((item: any) => {
            if (auth?.user?.email != item.email) {
                newUsers.push({
                    name: item.name,
                    email: item.email,
                    type: item.type,
                    hash: item.hash
                })
            }
        })

        setAllUsers(newUsers)
    }
    
    const deleteUser = async (hash: string) => {
        const res = await fetch(`${apiUrl}/api/users/${hash}/delete`, {
            method: "DELETE",
            credentials: "include"
        })

        if (!res.ok) {
            return toast.error("Não foi possível deletar esse usuário!")
        }

        setAllUsers(u => u.filter(user => user.hash !== hash))
        toast.success("Usuário apagado com Sucesso!")
    }

    return (
        <>
            <PageTemplate>
                <div className="w-full flex flex-col justify-center">
                    <div>
                        <h2 className="text-2xl font-bold mt-5 pl-4">Painel Administrativo</h2>
                        {/* <div className="mt-4 pl-4">
                            <ButtonGroup>
                                <Button className="bg-[#F4A153] text-white" variant="outline">Usuários</Button>
                                <Button className="bg-[#F4A153] text-white" variant="outline">Dados</Button>
                            </ButtonGroup>
                        </div> */}
                    </div>
                    <div className="w-full flex justify-center mt-4 mb-3">
                        <div className="w-9/10">
                            <div className="border rounded-[5px]">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Hash</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead>Ação</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {allUsers.map((user, key) => (
                                            <TableRow key={key}>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.hash}</TableCell>
                                                <TableCell>{user.type == "user" ? "User" : "Admin"}</TableCell>
                                                <TableCell>
                                                    <Button onClick={() => deleteUser(user.hash)} variant={"destructive"} >Apagar</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster richColors position="top-center" />
            </PageTemplate>
        </>
    )
}

export default DashboardAdmin
