import { Button } from "@/components/ui/button"
// import { ButtonGroup } from "@/components/ui/button-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import PageTemplate from "@/PageTemplates/PageTemplate"
import video from "../../assets/video_weather/rain.mp4"

function DashboardAdmin() {
    return (
        <>
            <PageTemplate>
                <div className="relative w-full h-[300px] overflow-hidden rounded-xl">
                {/* Vídeo de fundo */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src={video} type="video/mp4" />
                </video>

                {/* Conteúdo por cima */}
                <div className="relative z-10 p-6 text-white">
                    <h1 className="text-3xl font-bold">Clima agora</h1>
                    <p>24°C · Ensolarado</p>
                </div>

                {/* Sombra escura opcional */}
                <div className="absolute inset-0 bg-black/70"></div>
                </div>

                <div className="w-full flex flex-col justify-center">
                    <div>
                        <h2 className="text-2xl font-bold mt-5 pl-4">Painel Administrativo</h2>
                        {/* <div className="mt-4 pl-4">
                            <ButtonGroup>
                                <Button className="bg-[#F4A153] text-white" variant="outline">Usuários</Button>
                                <Button className="bg-[#F4A153] text-white" variant="outline">Dados</Button>
                            </ButtonGroup>
                        </div> */}
                    </div>
                    <div className="w-full flex justify-center mt-4 mb-3">
                        <div className="w-9/10">
                            <div className="border rounded-[5px]">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead>Ação</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Pedro Henrique Godoy</TableCell>
                                            <TableCell>p@p.com</TableCell>
                                            <TableCell>User</TableCell>
                                            <TableCell>
                                                <Button variant={"destructive"} >Apagar</Button>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>Pedro Henrique Godoy</TableCell>
                                            <TableCell>p@p.com</TableCell>
                                            <TableCell>User</TableCell>
                                            <TableCell>
                                                <Button variant={"destructive"} >Apagar</Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
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
                </div>     
            </PageTemplate>
        </>
    )
}

export default DashboardAdmin