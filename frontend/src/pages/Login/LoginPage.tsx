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
import styles from './LoginPage.module.css'

function LoginPage() {
    const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false)

    return (
        <>
            <div className="h-screen w-full flex">
                <div className="md:w-1/2 w-full flex md:items-center justify-center bg-white">
                    <div className="w-full max-w-sm">
                        <div className="w-full flex justify-center md:hidden mb-2">
                            <img className="w-70" src={avatar_com_blob} alt="Avatar" />
                        </div>
                        <form className="p-2" action="/login" method="POST">
                            <FieldSet>
                                <a className="block w-20" href="/">
                                    <img className="w-20" src={logo_trans} alt="Logo do GDASH" />
                                </a>
                                <FieldGroup>
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
                                        <FieldDescription>
                                            <span className="pr-1">Não tem conta.</span> 
                                            <a href="/criar-conta">Crie aqui</a>
                                        </FieldDescription>
                                    </Field>
                                    <Button type="submit">Fazer Login</Button>
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

export default LoginPage;