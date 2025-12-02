import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import avatar from '../../assets/avatar/normal_avatar.png'

function Newsletter() {
    return (
        <>
            <h1 className="text-center text-3xl font-bold mt-5">Quer saber o tempo todos os dias?</h1>
            <p className="text-center mt-1 mb-4">Assine a nossa newsletter para receber fresquinho no seu email todos os dias</p>
            <div className="w-full m-auto flex justify-center">
                <img src={avatar} alt="Esse é o meu Avatar da Senhora do Tempo GDASH" />
            </div>
            <div className="m-auto max-w-120">
                <Input type="email" placeholder="Seu melhor email" />
            </div>
            <div className="w-full flex justify-center mt-3">
                <Button>Inscrever</Button>
            </div>
        </>
    )
}

export default Newsletter