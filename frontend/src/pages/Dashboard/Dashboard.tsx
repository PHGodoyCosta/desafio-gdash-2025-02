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
import user_banner from '../../assets/user_banner.jpg'
import { Pencil } from "lucide-react";
function Dashboard() {
    return (
        <>
            <PageTemplate>
                <div className="relative mb-25 lg:mb-40 xl:mb-10">
                    <img className="w-full mt-1 min-h-60 max-h-70 object-cover" src={user_banner} alt="Banner principal do usuário" />
                    <div className="flex w-full justify-center lg:block lg:w-auto lg:ml-20 absolute top-40 lg:top-40">
                        <div className="flex flex-col gap-1 items-center">
                            <img className="rounded-4xl border-4 w-30 h-30 lg:w-50 lg:h-50 object-cover"src="https://i.pinimg.com/736x/36/4b/ae/364baea6d4606a3482f8963d3f9f6190.jpg" alt="" />
                            <h1 className="text-2xl font-bold text-black">Pedro Godoy</h1>
                        </div>
                    </div>
                </div>

                <div className="w-full px-4 md:px-0 gap-4 md:gap-0 mb-3 flex flex-col md:flex-row justify-center min-h-2">
                    <div className="max-w-150">
                        <h2 className="font-bold text-2xl mb-2">Editar Informações</h2>
                        <FieldSet>
                            <FieldGroup className="gap-3">
                                <Field>
                                    <FieldLabel htmlFor="username">Nome</FieldLabel>
                                    <div className="flex items-center gap-2">
                                        <Input id="nome" type="text" placeholder="Edite seu nome" />
                                        <Pencil />
                                    </div>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <div className="flex items-center gap-2">
                                        <Input id="email" type="email" placeholder="Edite seu email" />
                                        <Pencil />
                                    </div>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="senha">Senha</FieldLabel>
                                    <div className="flex items-center gap-2">
                                        <Input id="senha" type="password" placeholder="Mude sua Senha" />
                                        <Pencil />
                                    </div>
                                </Field>
                            </FieldGroup>
                            <Button className="w-min" type="button">Salvar</Button>
                        </FieldSet>
                    </div>
                    <Separator className="mx-5 w-0.5 bg-black hidden md:block"  orientation="vertical" />
                    <Separator className="my-5 h-0.5 bg-black md:hidden" />
                    <div className="max-w-100">
                        <h2 className="font-bold text-2xl mb-2">Newsletter</h2>
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
                                    <AlertDialogAction>Cancelar Assinatura</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </PageTemplate>
        </>
    )
}

export default Dashboard