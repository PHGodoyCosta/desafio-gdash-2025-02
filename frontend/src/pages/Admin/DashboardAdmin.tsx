import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import PageTemplate from "@/PageTemplates/PageTemplate"


function DashboardAdmin() {
    return (
        <>
            <PageTemplate>
                <div className="w-full flex flex-col justify-center">
                    <div className="w-8/10">
                        <h2 className="text-2xl font-bold mt-5 pl-4">Painel Administrativo</h2>
                        <div className="mt-4 pl-4">
                            <ButtonGroup>
                                <Button className="bg-[#F4A153] text-white" variant="outline">Usuários</Button>
                                <Button className="bg-[#F4A153] text-white" variant="outline">Dados</Button>
                            </ButtonGroup>
                        </div>
                        <div className="flex justify-center mt-3 mb-3">
                            <div className="border rounded-[5px]">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Hora</TableHead>
                                            <TableHead>Tempo</TableHead>
                                            <TableHead>Chuva</TableHead>
                                            <TableHead>Vento</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>00:00</TableCell>
                                            <TableCell>30°</TableCell>
                                            <TableCell>0 mm</TableCell>
                                            <TableCell>0%</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell>01:00</TableCell>
                                            <TableCell>29°</TableCell>
                                            <TableCell>0 mm</TableCell>
                                            <TableCell>0%</TableCell>
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