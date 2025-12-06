import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import avatar from '../../assets/avatar/avatar_newsletter.png'
import { toast } from "sonner"
import { useState } from "react"

function Newsletter() {
    const apiUrl = import.meta.env.VITE_API_URL
    const [inputValue, setInputValue] = useState<string>("")

    const subscribeNewsletter = async() => {
        const req = await fetch(`${apiUrl}/api/newsletter`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: inputValue
            })
        })

        if (req.ok) {
            toast.success("Pronto! Confirme o seu email para finalizar a inscrição!")
        }

        if (req.status == 400) {
            toast.error("Esse email já está cadastrado!")
        }

        setInputValue("")
        
    }

    return (
        <>
            <h1 className="text-center text-3xl font-bold mt-5">Quer saber o tempo todos os dias?</h1>
            <p className="text-center mt-1 mb-4">Assine a nossa newsletter para receber fresquinho no seu email todos os dias</p>
            <div className="w-full m-auto flex justify-center">
                <img src={avatar} alt="Esse é o meu Avatar da Senhora do Tempo GDASH" />
            </div>
            <div className="m-auto max-w-120">
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="email" placeholder="Seu melhor email" />
            </div>
            <div className="w-full flex justify-center mt-3">
                <Button onClick={subscribeNewsletter} >Inscrever</Button>
            </div>
            {/* <Toaster richColors position="top-center" /> */}
        </>
    )
}

export default Newsletter