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
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import styles from '../Login/LoginPage.module.css'

function CreateAccountPage() {
    const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false)
    const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState<boolean>(false)

    return (
        <>
            <div className="h-screen w-full flex">
                <div className="md:w-1/2 w-full flex items-center justify-center bg-white">
                    <div className="w-full max-w-sm">
                        <form action="/criar-conta" method="POST">
                            <FieldSet>
                                <a className="block w-20" href="/">
                                    <img className="w-20" src={logo_trans} alt="Logo do GDASH" />
                                </a>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="username">Nome</FieldLabel>
                                        <Input id="name" type="text" placeholder="Digite o seu Nome" />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="username">Email</FieldLabel>
                                        <Input id="email" type="email" placeholder="Digite seu Email" />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                                        <div className="flex items-center gap-2">
                                            <Input id="password" type={isPasswordShow ? "text" : "password"} placeholder="••••••••" />
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
                                            <Input id="password" type={isConfirmPasswordShow ? "text" : "password"} placeholder="••••••••" />
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
                                    <Button type="submit">Criar Conta</Button>
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