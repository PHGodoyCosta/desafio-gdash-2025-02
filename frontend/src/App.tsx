import "./App.css";
import PageTemplate from "./PageTemplates/PageTemplate";
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import nuvem from './assets/weather/ceu_nublado.webm'
import { Download } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
//import { Table as TableLiquid, Card } from 'liquid-glass-tailwind-react'
import { DataLineWeather } from "./components/DataLine/DataLine";


function App() {
    return (
        <>
            <PageTemplate>
                <div className="flex m-auto w-min flex-col gap-2 mt-8">
                    <div className="flex justify-between items-center">
                        <span className="text-xl">Nova Alvorada do Sul - MS</span>
                        <div className="flex">
                            <Button className="bg-[#273A57] text-white" variant="outline">
                                Download .xlsx
                                <Download />
                            </Button>
                            <Button className="bg-[#273A57] text-white" variant="outline">
                                Download .csv
                                <Download />
                            </Button>
                        </div>
                    </div>
                    <div className="w-full flex justify-center mt-4">
                        <ButtonGroup>
                            <Button className="bg-[#F4A153] text-white" variant="outline">Segunda</Button>
                            <Button className="bg-[#F4A153] text-white" variant="outline">Terça</Button>
                            <Button className="bg-[#F4A153] text-white" variant="outline">Quarta</Button>
                            <Button className="bg-[#F4A153] text-white" variant="outline">Quinta</Button>
                            <Button className="bg-[#F4A153] text-white" variant="outline">Sexta</Button>
                            <Button className="bg-[#F4A153] text-white" variant="outline">Sábado</Button>
                            <Button className="bg-[#F4A153] text-white" variant="outline">Domingo</Button>
                        </ButtonGroup>
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex justify-around items-center">
                        <div className="flex gap-3 items-center">
                            {/* <img src={nuvem} alt="Gif de núvem nublada" /> */}
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="pointer-events-none select-none"
                            >
                            <source src={nuvem} type="video/webm" />
                            </video>
                            <span className="text-5xl">21°</span>
                        </div>
                        <span className="text-xl">Chuva Forte</span>
                    </div>
                    <div className="grid grid-cols-3 gap-6 w-full p-6">
  
                        {/* Coluna da esquerda */}
                        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg p-3 max-w-80">
                            <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead>Hora</TableHead>
                                    <TableHead>Temp</TableHead>
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
                        <div className="flex flex-col gap-2 p-10">
                            {/* ... itens da previsão por hora ... */}
                        </div>

                        {/* Coluna do meio */}
                        <div className="flex flex-col gap-4 p-10">
                            {/* card clima principal */}
                            {/* card dica azul */}
                            {/* card motivacional */}
                            <DataLineWeather rain={20} wind={50} energia={50} temperature={50} umidade={50} />
                        </div>

                        {/* Coluna da direita */}
                        <div className="flex flex-col gap-6 p-10">
                            {/* card churrascometro */}
                            {/* gráfico */}
                        </div>

                    </div>

                </div>
            </PageTemplate>   
        </>
    );
}

export default App;
