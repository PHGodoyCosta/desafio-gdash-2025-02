import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageTemplate from "@/PageTemplates/PageTemplate"
import avatar from '../../assets/avatar/avatar_rick_and_morty.png'
import avatar_pensador from '../../assets/avatar/avatar_pensando.png'
import { useState } from "react"
import { Card } from "./Components/Card/Card"
import { Search } from "lucide-react"
import type { CardProps } from "./Components/Card/Card"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import { useEffect } from "react"
import { Spinner } from "@/components/ui/spinner"
import { motion } from "framer-motion"

function ExplorarPage() {
    const apiOriginUrl = import.meta.env.VITE_API_URL
    const [searchInput, setSearchInput] = useState<string>("")
    const [results, setResults] = useState<CardProps[]>([])
    const [apiUrl, setApiUrl] = useState<string>(`${apiOriginUrl}/api/rick-and-morty/`)
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)

    useEffect(() => {
        fetch(apiUrl)
            .then(async(data) => {
                const response = await data.json()
                const allResults: CardProps[] = []
                
                response["results"].map((item: any) => {
                    allResults.push({
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        genero: item.gender,
                        status: item.status,
                        ultimoLocal: item.location.name,
                        primeiroVistoEm: item.origin.name
                    })
                })
                
                setResults(allResults)
                setTotalPages(response.info.pages)
                //console.log(response)
            })
            .catch(error => {
                console.error(error)
            })  
    }, [apiUrl])

    useEffect(() => {
        const url = new URL(apiUrl)

        if (searchInput) {
            url.searchParams.set("name", searchInput)
            setPage(1)
        }

        setApiUrl(url.href)
    }, [searchInput])

    useEffect(() => {
        const url = new URL(apiUrl)

        if (page) {
            url.searchParams.set("page", String(page))
        }

        setApiUrl(url.href)
    }, [page])

    const nextPage = () => {
        if (page + 1 <= totalPages) {
            setPage(p => p + 1)
        }
    }

    const prevPage = () => {
        if (page - 1 > 0) {
            setPage(p => p - 1)
        }
    }

    return (
        <>
            <PageTemplate>
                <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    duration: 0.6,
                    delay: 0.5,
                    type: "spring",
                    stiffness: 120,
                    damping: 20
                }}
                >

                    <h1 className="text-center text-3xl font-bold mt-5">Bem vindo ao Espaço Rick and Morty</h1>
                    <p className="text-center">Para demonstrar minhas habilidades no consumo de APIs, criei essa área!<br/>Explore todos os seus personagens favoritos!</p>
                    <img className="m-auto pt-5 pb-3 w-full md:max-w-150" src={avatar} alt="Esse é o avatar da Senhora do tempo acompanhado do Rick And Morty" />
                    <div className="px-3 md:px-0 max-w-120 flex m-auto gap-2 mt-3">
                        <Input onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="Busque por um personagem de Rick And Morty" />
                        <Button type="button" variant="outline">
                            <Search />
                            Buscar
                        </Button>
                    </div>
                </motion.div>
                <div id="resultados" className="w-full flex justify-center mt-3">
                    <div className="md:w-8/10 px-3 md:px-0">
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
                        <div className="flex flex-wrap justify-center gap-4 mt-4 mb-2">
                            {results.length ? (
                                <>
                                    {results.map((item, key) => (
                                        <>
                                            <motion.div
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: [40, -5, 0] }}
                                            transition={{ duration: 1.5, delay: 1 * 0.1, ease: "easeOut" }}
                                            >
                                                <Card
                                                    key={key}
                                                    id={item.id}
                                                    name={item.name}
                                                    image={item.image}
                                                    primeiroVistoEm={item.primeiroVistoEm}
                                                    status={item.status}
                                                    ultimoLocal={item.ultimoLocal}
                                                />
                                            </motion.div>
                                        </>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col justify-center">
                                        <img className="max-w-100" src={avatar_pensador} alt="Avatar Senhora do Tempo esperando o loading" />
                                        <p className="flex gap-1 items-center justify-center">
                                            <Spinner className="size-6" />
                                            <span className="text-xl font-bold text-center">Carregando...</span>
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <Pagination className="m-auto mt-3 mb-5">
                    <PaginationContent>
                        {page > 1 && (
                            <>
                                <PaginationItem className="shrink-0">
                                    <PaginationLink
                                        href="#resultados"
                                        onClick={prevPage}
                                        className="inline-flex items-center justify-center px-4 py-2 min-w-[88px] whitespace-nowrap"
                                    >
                                        Anterior
                                    </PaginationLink>
                                </PaginationItem>
                            </>
                        )}

                        <PaginationItem>
                            <PaginationLink 
                                href="#resultados"
                                onClick={() => setPage(page == 1 ? 1 : page - 1)}
                                isActive={page == 1 ? true : false}
                            >
                                {page == 1 ? 1 : page - 1}
                            </PaginationLink>
                        </PaginationItem>

                        {totalPages > 1 && (
                            <>
                                <PaginationItem>
                                    <PaginationLink 
                                        href="#resultados"
                                        isActive={page > 1 ? true : false}
                                        onClick={() => setPage(page > 1 ? page : page + 1)}
                                    >
                                        {page > 1 ? page : page + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            </>
                        )}

                        {totalPages > 2 && totalPages - page > 0 && (
                            <>
                                <PaginationItem>
                                    <PaginationLink
                                        href="#resultados"
                                        isActive={totalPages - page == 0 ? true : false}
                                        onClick={() => setPage(totalPages - page == 0 ? page : page == 1 ? page + 2 : page + 1)}    
                                    >
                                        {totalPages - page == 0 ? page : page == 1 ? page + 2 : page + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            </>
                        )}

                        {totalPages - page > 0 && (
                            <>
                                <PaginationItem className="shrink-0">
                                    <PaginationLink
                                        href="#resultados"
                                        onClick={nextPage}
                                        className="inline-flex items-center justify-center px-4 py-2 min-w-[88px] whitespace-nowrap"
                                    >
                                        Próximo
                                    </PaginationLink>
                                </PaginationItem>
                            </>
                        )}
                    </PaginationContent>
                </Pagination>

            </PageTemplate>
        </>
    )
}

export default ExplorarPage