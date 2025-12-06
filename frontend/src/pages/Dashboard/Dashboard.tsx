import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import PageTemplate from "@/PageTemplates/PageTemplate"
import default_icon from '../../assets/avatar/avatar_icon.png'
import { AlertCircleIcon, Pencil } from "lucide-react";
import { useNavigate } from "react-router";
import { AuthContext, type LoginReturnType} from "@/context/AuthContext";
import { useEffect, useContext, useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { toast, Toaster } from "sonner";
import styles from '../Login/LoginPage.module.css'

function Dashboard() {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const apiUrl = import.meta.env.VITE_API_URL
    const [nome, setNome] = useState<string>(auth?.user?.username ?? "")
    const [email, setEmail] = useState<string>(auth?.user?.email ?? "")
    const [password, setPassword] = useState<string>("")
    const [isEdited, setIsEdited] = useState<boolean>(false)
    const [isNewsletterSubscribed, setIsNewslleterSubscribed] = useState<string | null>(null)
    const [alert, setAlert] = useState<string>("")

    useEffect(() => {
        auth?.fetchUser()
        checkSubscriptionOnNewsletter()
    }, [])

    useEffect(() => {
        setNome(auth?.user?.username ?? "")
        setEmail(auth?.user?.email ?? "")
    }, [auth])

    useEffect(() => {
        if (!isEdited) {
            setIsEdited(true)
        }
    }, [nome, email, password])
 
    const saveNewData = async() => {
        const update: LoginReturnType | undefined = await auth?.update(nome, auth.user?.email == email ? undefined : email, password)

        if (update?.statusCode == 200) {
            toast.success("Dados atualizados com sucesso!")
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } else {
            setAlert(update?.message ?? "")
        }
    }

    const logout = async() => {
        auth?.logout()
        navigate("/login")
    }

    const deleteAccount = async() => {
        if (auth?.user) {
            const response = await auth?.deleteUser(auth.user.hash)

            if (response.statusCode == 200) {
                toast.success("Conta deletada com sucesso!")
                auth.logout()
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            }

            if (response.statusCode == 403) {
                toast.success(response.message)
            }
        }
       
    }

    const checkSubscriptionOnNewsletter = async() => {
        const res = await fetch(`${apiUrl}/api/newsletter/status`, {
            method: "GET",
            credentials: "include"
        })

        if (!res.ok) {
            return setIsNewslleterSubscribed("error")
        }

        const data = await res.json()

        setIsNewslleterSubscribed(String(data.status))
    }

    const assinarNewsletter = async() => {
        const req = await fetch(`${apiUrl}/api/newsletter`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: String(auth?.user?.email),
                status: isNewsletterSubscribed ? isNewsletterSubscribed : undefined
            })
        })

        if (!req.ok) {
            return toast.error("Não foi possível realizar sua inscrição!")
        }

        toast.success("Pronto! Confirme o seu email para finalizar a inscrição!")
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }

    const cancelarNewsletter = async() => {
        const req = await fetch(`${apiUrl}/api/newsletter/cancel`, {
            method: "POST",
            credentials: "include"
        })

        if (!req.ok) {
            return toast.error("Não foi possível cancelar a assinatura!")
        }

        toast.success("Pronto! Assinatura cancelada!")
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }

    return (
        <>
            <PageTemplate>
                <div className="relative mb-30 lg:mb-40 xl:mb-10">
                    <div style={{background: "linear-gradient(90deg,rgba(80, 227, 194, 1) 0%, rgba(67, 220, 172, 1) 43%, rgba(84, 175, 197, 1) 100%)"}} className={`${styles.background_login} w-full mt-1 min-h-60 max-h-70 object-cover`}></div>
                    <div className="flex w-full justify-center lg:block lg:w-auto lg:ml-20 absolute top-40 lg:top-40">
                        <div className="flex flex-col gap-1 items-center">
                            <img className="rounded-4xl border-4 w-30 h-30 lg:w-50 lg:h-50 object-cover"src={default_icon} alt="Icon de Avatar do usuário" />
                            <h1 className="text-xl sm:text-2xl text-center font-bold text-black">{auth?.user?.username}</h1>
                        </div>
                    </div>
                </div>

                <div className="w-full px-4 md:px-0 gap-4 md:gap-0 mb-4 flex flex-col md:flex-row justify-center min-h-2">
                    <div className="max-w-150">
                        <h2 className="font-bold text-xl sm:text-2xl mb-2">Editar Informações</h2>
                        <FieldSet>
                            <FieldGroup className="gap-3">
                                {alert && (
                                    <>
                                        <Field>
                                            <Alert variant={"destructive"}>
                                                <AlertCircleIcon />
                                                <AlertTitle>
                                                    {alert}
                                                </AlertTitle>
                                            </Alert>
                                        </Field>
                                    </>
                                )}
                                <Field>
                                    <FieldLabel htmlFor="username">Nome</FieldLabel>
                                    <div className="flex items-center gap-2">
                                        <Input value={nome} onChange={(e) => setNome(e.target.value)} id="nome" type="text" placeholder="Edite seu nome" />
                                        <Pencil />
                                    </div>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <div className="flex items-center gap-2">
                                        <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="Edite seu email" />
                                        <Pencil />
                                    </div>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="senha">Nova Senha</FieldLabel>
                                    <div className="flex items-center gap-2">
                                        <Input value={password} onChange={(e) => setPassword(e.target.value)} id="senha" type="password" placeholder="Mude sua Senha" />
                                        <Pencil />
                                    </div>
                                </Field>
                            </FieldGroup>
                            <Button disabled={!isEdited} onClick={saveNewData} className="w-min" type="button">Salvar</Button>
                        </FieldSet>
                    </div>
                    <Separator className="mx-5 w-0.5 bg-black hidden md:block"  orientation="vertical" />
                    <Separator className="my-5 h-0.5 bg-black md:hidden" />
                    <div className="max-w-100">
                        <h2 className="font-bold text-xl sm:text-2xl mb-2">Newsletter</h2>
                        {isNewsletterSubscribed != null && (
                            <>
                                {isNewsletterSubscribed == "ok" ? (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className="w-min" type="button" variant={"destructive"}>Cancelar Assinatura</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Isso cancelará sua assinatura na newsletter e você não receberá mais informações no seu email.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Voltar</AlertDialogCancel>
                                                <AlertDialogAction onClick={cancelarNewsletter} >Cancelar Assinatura</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                ) : isNewsletterSubscribed == "confirm" ? (
                                    <Button onClick={assinarNewsletter} variant="outline" className="w-min" type="button">Não recebeu o email? Tente novamente</Button>
                                ) : (
                                    <Button onClick={assinarNewsletter} className="w-min" type="button">Assine aqui</Button>
                                )}
                            </>
                        )}
                        <h2 className="font-bold text-xl sm:text-2xl mb-2 mt-5">Ações</h2>
                        <div className="mb-3 mt-3">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="w-min" type="button">Sair do perfil</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Isso te deslogará da sua conta automaticamente, te levando para a página de login.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Voltar</AlertDialogCancel>
                                        <AlertDialogAction onClick={logout}>Deslogar</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        <div>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="w-min" type="button" variant={"destructive"}>Apagar Conta</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Essa ação apagará PERMANENTEMENTE A SUA CONTA.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Voltar</AlertDialogCancel>
                                        <AlertDialogAction onClick={deleteAccount}>
                                            Apagar Conta
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
                <Toaster richColors position="top-center" />
            </PageTemplate>
        </>
    )
}

export default Dashboard