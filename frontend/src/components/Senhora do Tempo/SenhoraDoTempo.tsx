import avatar from '../../assets/avatar/avatar_senhora_do_tempo.png'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'
import { Spinner } from "@/components/ui/spinner"

type MensagemType = {
    itsMe: boolean,
    content: string
}

function SenhoraDoTempo() {
    return (
        <>
            <h1 className="text-center text-3xl font-bold mt-5">Fale com a Senhora do Tempo!</h1>
            <p className="text-center">Será que rola aquela viagem em família hoje? Pergunte para ela!</p>

            <div className="mt-5 flex flex-col items-center lg:grid lg:grid-cols-10 lg:grid-rows-1 gap-3 md:gap-0">
                <div className="col-span-3 flex items-center">
                    <img className="w-100 md:w-125" src={avatar} alt="Avatar da Senhora do tempo" />
                </div>
                <div className="col-span-6 col-start-4">
                    <div className="flex flex-col gap-3">
                        <div className="h-150 overflow-y-auto border-3 bg-white rounded-[5px] p-3 flex flex-col gap-3">
                            <Mensagem
                                itsMe={true}
                                content='Essa é uma mensagem teste para a Senhora do Tempo'
                            />
                            <Mensagem
                                itsMe={true}
                                content='Essa é uma mensagem teste para a Senhora do Tempo'
                            />
                            <Mensagem
                                itsMe={false}
                                content='Essa é uma mensagem resposta da Senhora do Tempo'
                            />
                            <LoadingMensage />
                        </div>
                        <div className="flex w-full items-center gap-2">
                            <Input className="bg-white p-4" type="text" placeholder="Envie sua pergunta" />
                            <Button type="button" variant="outline">
                                <Send />
                                Enviar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function LoadingMensage() {
    return (
        <>
            <div className="flex items-center gap-1 font-bold">
                <Spinner className="size-6" />
                <span>Pensando...</span>
            </div>
        </>
    )
}

function Mensagem({ itsMe, content }: MensagemType) {
    return (
        <>
            <div className={`w-full flex ${itsMe ? "justify-end" : "justify-start"}`}>
                <div>
                    <span>{itsMe ? "Você" : "Senhora do Tempo"}</span>
                    <div className={`${itsMe ? "bg-[#273A57]" : "bg-[#F4A153]"} p-3 rounded-[5px] text-white`}>
                        {content}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SenhoraDoTempo