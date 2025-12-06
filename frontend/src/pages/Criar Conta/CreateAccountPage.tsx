import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import logo_trans from '../../assets/logo_trans.webp'
import logo_white_trans from '../../assets/logo_white_trans.webp'
import avatar_com_blob from '../../assets/avatar_com_blob.png'
import { AlertCircleIcon, Eye, EyeClosed } from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext} from "@/context/AuthContext";
import styles from '../Login/LoginPage.module.css'
import { useNavigate } from "react-router";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import type { LoginReturnType } from "@/context/AuthContext";

function CreateAccountPage() {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false)
    const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState<boolean>(false)

    //Form
    const [nome, setNome] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const [alertMessage, setAlertMessage] = useState<string>("")
    const [isLogging, setIsLogging] = useState<boolean>(false)

    const handleCriarConta = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLogging(true)

        if (!password || !nome || !email || !confirmPassword) {
            setAlertMessage("Campos vazios!")
            return setIsLogging(false)
        }

        if (password != confirmPassword) {
            setAlertMessage("Senhas diferentes!")
            return setIsLogging(false)
        }

        const response: LoginReturnType | undefined = await auth?.createUser(nome, email, password)

        if (response?.statusCode != 200) {
            setAlertMessage(response?.message ?? "")
            return setIsLogging(false)
        }

        navigate("/dashboard")
    }

    return (
        <>
            <div className="h-screen w-full flex">
                <div className="md:w-1/2 w-full flex items-center justify-center bg-white">
                    <div className="w-full max-w-sm">
                        <div className="w-full flex justify-center md:hidden mb-2">
                            <img className="w-70" src={avatar_com_blob} alt="Avatar" />
                        </div>
                        <form onSubmit={handleCriarConta} className="p-2">
                            <FieldSet>
                                <a className="block w-20" href="/">
                                    <img className="w-20" src={logo_trans} alt="Logo do GDASH" />
                                </a>
                                <FieldGroup>
                                    {alertMessage && (
                                        <>
                                            <Field>
                                                <Alert variant={"destructive"}>
                                                    <AlertCircleIcon />
                                                    <AlertTitle>
                                                        {alertMessage}
                                                    </AlertTitle>
                                                </Alert>
                                            </Field>
                                        </>
                                    )}
                                    <Field>
                                        <FieldLabel htmlFor="username">Nome</FieldLabel>
                                        <Input value={nome} onChange={(e) => setNome(e.target.value)} id="name" type="text" placeholder="Digite o seu Nome" />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="username">Email</FieldLabel>
                                        <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="Digite seu Email" />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                                        <div className="flex items-center gap-2">
                                            <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type={isPasswordShow ? "text" : "password"} placeholder="••••••••" />
                                            <Button type="button" className="cursor-pointer" onClick={() => setIsPasswordShow(p => !p)} variant="outline" size="icon">
                                                {isPasswordShow ? (
                                                    <>
                                                        <EyeClosed />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Eye />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                        <FieldDescription>
                                            Deve ter 8 caracteres, pelo menos um número e uma letra maiuscula
                                        </FieldDescription>
                                        <FieldLabel htmlFor="password">Confirmar Senha</FieldLabel>
                                        <div className="flex items-center gap-2">
                                            <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="password" type={isConfirmPasswordShow ? "text" : "password"} placeholder="••••••••" />
                                            <Button type="button" className="cursor-pointer" onClick={() => setIsConfirmPasswordShow(p => !p)} variant="outline" size="icon">
                                                {isConfirmPasswordShow ? (
                                                    <>
                                                        <EyeClosed />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Eye />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                        <FieldDescription>
                                            <span className="pr-1">Já tem uma conta?</span> 
                                            <a href="/login">Faça Login</a>
                                        </FieldDescription>
                                    </Field>
                                    <Button disabled={Boolean(isLogging)} type="submit">
                                        {isLogging ? (
                                            <>
                                                <Spinner className="size-4 text-white" />
                                            </>
                                        ) : (
                                            <>
                                                Criar Conta
                                            </>
                                        )}
                                    </Button>
                                </FieldGroup>
                            </FieldSet>
                        </form>
                    </div>
                </div>
                <div className={`w-1/2 hidden md:flex items-center justify-center ${styles.background_login}`}>
                    <div className="z-10">
                        <img src={avatar_com_blob} alt="Avatar" />
                    </div>
                    <div className="absolute right-2 bottom-1">
                        <img className="w-30" src={logo_white_trans} alt="Logo do GDASH branca" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateAccountPage