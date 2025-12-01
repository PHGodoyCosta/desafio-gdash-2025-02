import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageTemplate from "@/PageTemplates/PageTemplate"
import avatar from '../../assets/avatar/normal_avatar.png'
import { useState } from "react"
import { Card } from "./Components/Card/Card"
import { Search } from "lucide-react"
//import { ItemGroup } from "@/components/ui/item"
import type { CardProps } from "./Components/Card/Card"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


function ExplorarPage() {
    const [searchInput, setSearchInput] = useState<string>("")
    const [results, setResults] = useState<CardProps[]>([
        {
            id: 1,
            name: "Rick Sanches",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCtHWmw91Rx-dcR1c-vcs3NJkWNti-sPB-Bw&s",
            status: "Vivo - Humano",
            ultimoLocal: "Terra",
            primeiroVistoEm: "Planeta dos Ricks"
        },
        {
            id: 2,
            name: "Rick Sanches",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCtHWmw91Rx-dcR1c-vcs3NJkWNti-sPB-Bw&s",
            status: "Vivo - Humano",
            ultimoLocal: "Terra",
            primeiroVistoEm: "Planeta dos Ricks"
        }
    ])

    return (
        <>
            <PageTemplate>
                <h1 className="text-center text-3xl font-bold mt-5">Bem vindo ao Espaço Rick and Morty</h1>
                <p className="text-center">Para demonstrar minhas habilidades no consumo de APIs, criei essa área!<br/>Explore todos os seus personagens favoritos!</p>
                <img className="m-auto pt-5 pb-3" src={avatar} alt="Esse é o avatar da Senhora do tempo acompanhado do Rick And Morty" />
                <div className="max-w-120 flex m-auto gap-2 mt-3">
                    <Input onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="Busque por um personagem de Rick And Morty" />
                    <Button type="button" variant="outline">
                        <Search />
                        Buscar
                    </Button>
                </div>
                <div className="w-full flex justify-center mt-3">
                    <div className="w-8/10">
                        <h2 className="font-bold text-xl">
                            {searchInput ? (
                                <>
                                    <span>Você procurou por: "</span>
                                    <span className="text-[#F4A153]">{searchInput}</span>
                                    <span>"</span>
                                </>
                            ) : (
                                <>
                                    Todos os resultados encontrados:
                                </>
                            )}
                        </h2>
                        <div className="flex flex-wrap gap-4 mt-4 mb-2">
                            {results.map((item, key) => (
                                <>
                                    <Card
                                        key={key}
                                        id={item.id}
                                        name={item.name}
                                        image={item.image}
                                        primeiroVistoEm={item.primeiroVistoEm}
                                        status={item.status}
                                        ultimoLocal={item.ultimoLocal}
                                    />
                                </>
                            ))}
                        </div>
                    </div>
                </div>
                <Pagination className="m-auto mt-3 mb-5">
                    <PaginationContent>
                        <PaginationItem className="shrink-0">
                            <PaginationLink
                                href="#"
                                className="inline-flex items-center justify-center px-4 py-2 min-w-[88px] whitespace-nowrap"
                            >
                                Anterior
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>

                        <PaginationItem className="shrink-0">
                            <PaginationLink
                                href="#"
                                className="inline-flex items-center justify-center px-4 py-2 min-w-[88px] whitespace-nowrap"
                            >
                                Próximo
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </PageTemplate>
        </>
    )
}

export default ExplorarPage