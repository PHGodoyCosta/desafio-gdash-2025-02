import PageTemplate from "@/PageTemplates/PageTemplate"
//import { useParams } from "react-router"
import { useState } from "react"
import type { CardProps } from "../Components/Card/Card"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item"


function Personagem() {
    //const { id } = useParams()
    const [result, setResult] = useState<CardProps>({
        id: 1,
        name: "Rick Sanches",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCtHWmw91Rx-dcR1c-vcs3NJkWNti-sPB-Bw&s",
        genero: "Masculino",
        origem: "Terra",
        status: "Vivo - Humano",
        ultimoLocal: "Terra",
        primeiroVistoEm: "Planeta dos Ricks"
    })

    return (
        <>
            <PageTemplate>
                <div className="flex justify-center gap-3 mt-5">
                    <div>
                        <img className="rounded-t-[5px] md:w-60" src={result.image} alt={result.name} />
                        <div className="flex justify-between gap-3 mt-2 p-2">
                            <Item variant="outline" asChild>
                                <ItemContent>
                                    <ItemTitle>Origem</ItemTitle>
                                    <ItemDescription>
                                        {result.origem}                                    
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
                    <div>
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
            </PageTemplate>
        </>
    )
}

export default Personagem