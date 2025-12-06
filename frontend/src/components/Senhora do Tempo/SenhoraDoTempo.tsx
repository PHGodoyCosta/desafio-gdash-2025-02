import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'
import { Spinner } from "@/components/ui/spinner"
import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'

//Avatares:
import senhora_do_tempo from '../../assets/avatar/avatar_senhora_do_tempo.png'
import avatar_pensando from '../../assets/avatar/avatar_pensando.png'

type MensagemType = {
    role: "user" | "assistant",
    content: string
}

function SenhoraDoTempo() {
    const apiUrl = import.meta.env.VITE_API_URL
    const [mensagens, setMensagens] = useState<MensagemType[]>([{
        role: "assistant",
        content: "Olá! Sou a Senhora do Tempo, no que posso te ajudar hoje?"
    }])
    const [isLoadingMessage, setIsLoadingMessage] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("")
    const [avatar, setAvatar] = useState<string>(senhora_do_tempo)
    const chatRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (isLoadingMessage) {
            setAvatar(avatar_pensando)
        } else {
            setAvatar(senhora_do_tempo)
        }
    }, [isLoadingMessage])

    function handleEnviar(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            sendMessage()
        }
    }

    const sendMessage = async() => {
        setIsLoadingMessage(true)
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
        })

        const dateNow = new Date()
        dateNow.setUTCHours(0, 0, 0, 0)

        const newMessage: MensagemType = {
            role: "user",
            content: inputValue
        }

        setInputValue("")
        setMensagens(m => [...m, newMessage])

        try {
            const req = await fetch(`${apiUrl}/api/senhora-do-tempo`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: [
                        ...mensagens,
                        newMessage
                    ],
                    day: dateNow.toISOString()
                })
            })

            const data = await req.json()
            
            if (req.ok) {
                const newResponseMessage: MensagemType = {
                    role: "assistant",
                    content: data.response
                }
                setMensagens(m => [...m, newResponseMessage])
                setIsLoadingMessage(false)
                chatRef.current?.scrollTo({
                    top: chatRef.current.scrollHeight,
                    behavior: "smooth",
                })
            } else {
                toast.error("Erro ao falar com a Senhora do Tempo! Tente novamente mais tarde!")
            }
        } catch (error){
            toast.error("Erro ao falar com a Senhora do Tempo! Tente novamente mais tarde!")
            console.error(error)
        }
    }

    return (
        <>
            <h1 className="text-center text-3xl font-bold mt-5">Fale com a Senhora do Tempo!</h1>
            <p className="text-center">Será que rola aquela viagem em família hoje? Pergunte para ela!</p>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                <div className="w-full lg:w-3/10 p-4 text-white text-center">
                    <div className="flex justify-center items-center">
                        <img className="w-100 md:w-125" src={avatar} alt="Avatar da Senhora do tempo" />
                    </div>
                </div>
                <div className="w-full lg:w-7/10 p-4 text-black text-center">
                    <div className="md:px-3">
                        <div className="flex flex-col gap-3">
                            <div ref={chatRef} className="h-150 overflow-y-auto border-3 bg-white rounded-[5px] p-3 flex flex-col gap-3">
                                {mensagens.map((item, key) => (
                                    <Mensagem
                                        key={key}
                                        role={item.role}
                                        content={item.content}
                                    />
                                ))}
                                {isLoadingMessage && (
                                    <LoadingMensage />
                                )}
                            </div>
                            <div className="flex w-full items-center gap-2">
                                <Input value={inputValue} onKeyDown={handleEnviar} onChange={(e) => setInputValue(e.target.value)} className="bg-white p-4" type="text" placeholder="Envie sua pergunta" />
                                <Button onClick={sendMessage} type="button" variant="outline">
                                    <Send />
                                    Enviar
                                </Button>
                            </div>
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

function Mensagem({ role, content }: MensagemType) {
    return (
        <>
            <div className={`w-full flex ${role == "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-3/5 flex flex-col gap-1">
                    <span className="text-start">{role == "user" ? "Você" : "Senhora do Tempo"}</span>
                    <div className={`${role == "user" ? "bg-[#273A57]" : "bg-[#F4A153]"} p-3 rounded-[5px] text-white`}>
                        {content}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SenhoraDoTempo