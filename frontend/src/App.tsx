import "./App.css";
import PageTemplate from "./PageTemplates/PageTemplate";
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import nuvem from './assets/weather/ceu_nublado.webm'
import { Download } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DataLineWeather } from "./components/DataLine/DataLine";
import Insight from "./components/Insight/Insight";
import Churrascometro from "./components/Churrascometro/Churrascometro";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import SenhoraDoTempo from "./components/Senhora do Tempo/SenhoraDoTempo";
import Newsletter from "./components/Newsletter/Newsletter";
import VideoTemplate from "./PageTemplates/VideoTemplate";

function App() {
    const exampleData = [
        { name: "00:00", pv: 30, uv: 0 },
        { name: "01:00", pv: 29, uv: 0 },
        { name: "02:00", pv: 28, uv: 2 },
        { name: "03:00", pv: 27, uv: 5 },
        { name: "04:00", pv: 26, uv: 8 },
        { name: "05:00", pv: 25, uv: 12 },
        { name: "06:00", pv: 27, uv: 15 },
        { name: "07:00", pv: 29, uv: 10 },
        { name: "08:00", pv: 32, uv: 6 },
        { name: "09:00", pv: 34, uv: 4 },
    ]

    return (
        <>
            <PageTemplate>
                <div className="flex pl-2 md:pl-0 md:m-auto md:w-min flex-col md:gap-2 pt-10">
                    <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between md:items-center">
                        <span className="text-xl">Nova Alvorada do Sul - MS</span>
                        <div className="flex justify-center">
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
                    <div className="w-full flex md:justify-center mt-2 md:mt-4">
                        <ButtonGroup className="hidden md:flex">
                            <Button className="bg-[#F4A153] text-white" variant="outline">Segunda</Button>
                            <Button className="bg-[#F4A153] text-white" variant="outline">Terça</Button>
                            <Button className="bg-[#F4A153] text-white" variant="outline">Quarta</Button>
                            <Button className="bg-[#F4A153] text-white" variant="outline">Quinta</Button>
                            <Button className="bg-[#F4A153] text-white" variant="outline">Sexta</Button>
                            <Button className="bg-[#F4A153] text-white" variant="outline">Sábado</Button>
                            <Button className="bg-[#F4A153] text-white" variant="outline">Domingo</Button>
                        </ButtonGroup>
                        <div className="md:hidden">
                            <Select>
                                <SelectTrigger className="w-[180px] bg-[#F4A153] text-white">
                                    <SelectValue placeholder="Escolha um dia" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Dias da Semana</SelectLabel>
                                        <SelectItem value="segunda">Segunda</SelectItem>
                                        <SelectItem value="terça">Terça</SelectItem>
                                        <SelectItem value="quarta">Quarta</SelectItem>
                                        <SelectItem value="quinta">Quinta</SelectItem>
                                        <SelectItem value="sexta">Sexta</SelectItem>
                                        <SelectItem value="sabado">Sábado</SelectItem>
                                        <SelectItem value="domingo">Domingo</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="px-3 md:w-9/10 m-auto mt-5 mb-5 md:mb-0">
                        <VideoTemplate>
                            <div className="flex flex-col md:flex-row justify-around md:items-center">
                                <div className="flex gap-3 justify-around md:justify-start items-center">
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
                        </VideoTemplate>
                        <div className="grid grid-cols-1 md:grid-cols-10 gap-5 mt-5">

                            {/* TABELA */}
                            <div className="md:col-span-3 md:row-span-6 order-1">
                                <div className="flex justify-center">
                                    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg p-3 w-full md:max-w-80">
                                        <Table>
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

                            {/* INSIGHTS + GAUGE */}
                            <div className="md:col-span-4 md:row-span-3 md:col-start-4 order-2">
                                <DataLineWeather rain={20} wind={50} energia={50} temperature={50} umidade={50} />

                                <div className="mt-5">
                                    <Insight content="Hoje está um dia excelente para tomar um banho de piscina!" type="sensation"/>
                                </div>

                                <div className="mt-5">
                                    <Insight content="Hoje a energia vai estar tinindo!" type="energy"/>
                                </div>
                            </div>

                            {/* GRÁFICOS */}
                            <div className="md:col-span-7 md:row-span-3 md:col-start-4 md:row-start-4 order-3">
                                <div className="flex flex-col md:flex-row items-center justify-center gap-5 pt-3">
                                    <LineChart style={{ width: '100%', maxWidth: '400px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }} responsive data={exampleData} margin={{ top: 5, right: 0, left: 0, bottom: 5, }} > <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="name" /> <YAxis width="auto" /> <Tooltip /> <Legend /> <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> </LineChart> <LineChart style={{ width: '100%', maxWidth: '400px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }} responsive data={exampleData} margin={{ top: 5, right: 0, left: 0, bottom: 5, }} > <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="name" /> <YAxis width="auto" /> <Tooltip /> <Legend /> <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> </LineChart>
                                </div>
                            </div>

                            {/* CHURRASCOMETRO */}
                            <div className="md:col-span-3 md:row-span-3 md:col-start-8 md:row-start-1 order-4">
                                <Churrascometro content="Terçou Bebê! Hoje é dia de botar na grelha e relaxar!" />
                            </div>

                        </div>
                    </div>
                </div>
                <div id="senhora-do-tempo" className="w-full bg-gray-100 py-5 px-3 md:px-0">
                    <SenhoraDoTempo />
                </div>
                <div id="newsletter" className="w-full py-5 px-3 md:px-0">
                    <Newsletter />
                </div>
            </PageTemplate>   
        </>
    );
}

export default App;
