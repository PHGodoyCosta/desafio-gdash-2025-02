import PageTemplate from "@/PageTemplates/PageTemplate"
import { useParams } from "react-router"
import { useState } from "react"
import type { CardProps } from "../Components/Card/Card"
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item"
import { useEffect } from "react"
import { MoveLeft } from "lucide-react"
import { Button } from "@/components/ui/button"


function Personagem() {
    const { id } = useParams()
    const apiUrl = import.meta.env.VITE_API_URL
    const [result, setResult] = useState<CardProps | null>(null)

    //Upload de dados mockados 
    // useEffect(() => {
    //     setResult({
    //         id: 1,
    //         name: "Rick Sanches",
    //         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCtHWmw91Rx-dcR1c-vcs3NJkWNti-sPB-Bw&s",
    //         genero: "Masculino",
    //         origem: "Terra",
    //         status: "Vivo - Humano",
    //         ultimoLocal: "Terra",
    //         primeiroVistoEm: "Planeta dos Ricks"
    //     })
    // }, [])

    useEffect(() => {
        fetch(`${apiUrl}/api/rick-and-morty/caracter/${id}`)
        .then(async(data) => {
            const response = await data.json()
            setResult({
                id: response.id,
                name: response.name,
                image: response.image,
                status: response.status,
                genero: response.gender,
                ultimoLocal: response.location.name,
                primeiroVistoEm: response.origin.name
            })
            console.log(response)
        })
        .catch(error => {
            console.error(error)
        })  
    }, [apiUrl])

    return (
        <>
            <PageTemplate>
                <div className="w-full pl-3 mt-3">
                    <Button variant="outline" asChild>
                        <a href="/explorar">
                            <MoveLeft />
                            <span>Voltar</span>
                        </a>
                    </Button>
                </div>
                {result ? (
                    <>
                        <div className="flex flex-col max-w-120 m-auto mt-3 md:mt-0 justify-center">
                            <div className="flex px-3 flex-col sm:flex-row items-center sm:items-start sm:justify-center gap-3 mt-5">
                                <div>
                                    <img className="rounded-t-[5px] md:w-60" src={result.image} alt={result.name} />
                                </div>
                                <div className="sm:w-auto">
                                    <h3 className="font-bold text-3xl">{result.name}</h3>
                                    <div className="mt-1">
                                        <div className="mb-3">
                                            <h3 className="text-muted-foreground text-lg">Status</h3>
                                            <p>{result.status}</p>
                                        </div>
                                        <div className="mb-3">
                                            <h3 className="text-muted-foreground text-lg">Gênero</h3>
                                            <p>{result.genero}</p>
                                        </div>
                                        <div className="mb-3">
                                            <h3 className="text-muted-foreground text-lg">Ultimo local visto</h3>
                                            <p>{result.ultimoLocal}</p>
                                        </div>
                                        <div className="mb-3">
                                            <h3 className="text-muted-foreground text-lg">Primeira vez visto em</h3>
                                            <p>{result.primeiroVistoEm}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-2 p-2">
                                <Item variant="outline" asChild>
                                    <ItemContent>
                                        <ItemTitle>Origem</ItemTitle>
                                        <ItemDescription>
                                            {result.primeiroVistoEm}                                    
                                        </ItemDescription>
                                    </ItemContent>
                                </Item>
                                <Item variant="outline" asChild>
                                    <ItemContent>
                                        <ItemTitle>Local</ItemTitle>
                                        <ItemDescription>
                                            {result.ultimoLocal}                                    
                                        </ItemDescription>
                                    </ItemContent>
                                </Item>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>404</h1>
                    </>
                )}
            </PageTemplate>
        </>
    )
}

export default Personagem