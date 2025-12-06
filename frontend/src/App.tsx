import "./App.css";
import PageTemplate from "./PageTemplates/PageTemplate";
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
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
import MainInsight from "./components/MainInsight/MainInsight";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import SenhoraDoTempo from "./components/Senhora do Tempo/SenhoraDoTempo";
import Newsletter from "./components/Newsletter/Newsletter";
import VideoTemplate from "./PageTemplates/VideoTemplate";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import type { WeatherDayLogsType, WeatherLogsType } from "./types/weather";

// Importando weather animations:
import ceu_limpo from './assets/weather/ceu_limpo.webm'
import ceu_nublado from './assets/weather/ceu_nublado.webm'
import chuva_dia from './assets/weather/chuva_dia.webm'
import chuva_noite from './assets/weather/chuva_noite.webm'
//import neve_dia from './assets/weather/neve_dia.webm'
//import neve_noite from './assets/weather/neve_noite.webm'
import nevoa from './assets/weather/nevoa.webm'
import parcialmente_nublado from './assets/weather/parcialmente_nublado.webm'
import tempestade from './assets/weather/tempestade.webm'
import { Skeleton } from "@/components/ui/skeleton";

import { motion } from "framer-motion";

type WeekDaysOrdened = {
    nameDay: string,
    day: number,
    isSelected: boolean,
    iso: string
}

type TemperatureGraficDataType = {
    name: string, //Horario
    temperatura: number
}

type RainGraficDataType = {
    name: string, //Horario
    rain: number
}

function App() {
    const apiUrl = import.meta.env.VITE_API_URL
    const [weatherDay, setWeatherDay] = useState<WeatherDayLogsType | null>(null)
    const [weatherLogs, setWeatherLogs] = useState<WeatherLogsType[] | null>(null)
    const [weekDays, setWeekDays] = useState<WeekDaysOrdened[]>([])
    const [daySelected, setDaySelected] = useState<number>(0)
    const [dateSelected, setDateSelected] = useState<string>("")
    const [temperatureGraficData, setTemperatureGraficaData] = useState<TemperatureGraficDataType[]>([])
    const [rainGraficData, setRainGraficaData] = useState<RainGraficDataType[]>([])

    const weatherCodeToText = (code: number) => {
        const map = {
            0: "Céu limpo",
            1: "Principalmente limpo",
            2: "Parcialmente nublado",
            3: "Nublado",
            45: "Névoa",
            48: "Névoa com geada",
            51: "Garoa leve",
            53: "Garoa moderada",
            55: "Garoa intensa",
            56: "Garoa congelante leve",
            57: "Garoa congelante intensa",
            61: "Chuva leve",
            63: "Chuva moderada",
            65: "Chuva forte",
            66: "Chuva congelante leve",
            67: "Chuva congelante forte",
            71: "Neve leve",
            73: "Neve moderada",
            75: "Neve intensa",
            77: "Grãos de neve",
            80: "Pancada de chuva leve",
            81: "Pancada de chuva moderada",
            82: "Pancada de chuva forte",
            85: "Pancada de neve leve",
            86: "Pancada de neve forte",
            95: "Trovoada",
            96: "Trovoada com granizo leve",
            99: "Trovoada com granizo forte"
        };
        return map[code] || "Desconhecido";
    }

    const getWeatherAnimationByCode = (code: number, isDay: boolean = true) => {
        if ([0, 1].find(p => p === code)) {
            return ceu_limpo
        } else if ([2].find(p => p === code)) {
            return parcialmente_nublado
        } else if ([3, 45, 48].find(p => p === code)) {
            return ceu_nublado
        } else if ([51, 53, 55, 56, 57, 61, 63, 80, 81, 65, 82].find(p => p === code) && isDay) {
            return chuva_dia
        } else if ([51, 53, 55, 56, 57, 61, 63, 80, 81, 65, 82].find(p => p === code) && !isDay) {
            return chuva_noite
        } else if ([71, 73, 75, 77, 85, 86].find(p => p === code)) {
            return nevoa
        } else if ([95, 96, 99].find(p => p === code)) {
            return tempestade
        } else {
            return ceu_limpo
        }
    }

    function initWeekDays() {
        const diasDaSemanaWritten = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
        const days: WeekDaysOrdened[] = []
        const dateNow = new Date()
        const ordenedDateWritten = [
            ...diasDaSemanaWritten.slice(dateNow.getDay()),
            ...diasDaSemanaWritten.slice(0, dateNow.getDay())
        ]

        dateNow.setUTCHours(0, 0, 0, 0);

        for (let i = 0; i < 7; i++) {
            const day = new Date(dateNow);
            day.setUTCDate(dateNow.getUTCDate() + i);

            setDateSelected(day.toISOString())

            days.push({
                nameDay: ordenedDateWritten[i],
                day: i,
                isSelected: i == 0 ? true : false,
                iso: day.toISOString()
            });
        }

        setWeekDays(days)

        return dateNow
    }

    useEffect(() => {
        const temperatureData: TemperatureGraficDataType[] = []
        const rainData: RainGraficDataType[] = []

        weatherLogs?.map(item => {
            const date = new Date(item.timestamp)

            const time = date.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC"
            });

            temperatureData.push({
                name: time,
                temperatura: Math.round(item.temperature)
            })

            rainData.push({
                name: time,
                rain: Math.round(item.precipitation_probability)
            })
        })

        setTemperatureGraficaData(temperatureData)
        setRainGraficaData(rainData)
    }, [weatherDay, weatherLogs])

    useEffect(() => {
        refreshData(dateSelected)
    }, [dateSelected])

    useEffect(() => {
        const now = initWeekDays()
    
        setDateSelected(now.toISOString())
    }, [])

    const refreshData = (day?: string) => {
        fetch(`${apiUrl}/api/weather/day/logs?day=${day || dateSelected}`)
            .then(async(data) => {
                const response: WeatherDayLogsType = await data.json()
                setWeatherDay(response)
            })
            .catch(error => {
                toast.error("Erro ao carregar os dados de clima! Tente novamente mais tarde!")
                console.error(error)
            })
        
        fetch(`${apiUrl}/api/weather/logs?day=${day || dateSelected}`)
            .then(async(data) => {
                const response: WeatherLogsType[] = await data.json()
                setWeatherLogs(response)
            })
            .catch(error => {
                toast.error("Erro ao carregar os dados de clima! Tente novamente mais tarde!")
                console.error(error)
            })
    }

    const selectNewDay = (day: number) => {
        setWeatherDay(null)
        setWeatherLogs(null)

        const copy: WeekDaysOrdened[] = weekDays

        const choosedDayIndex = weekDays.findIndex(w => w.day === day)
        const choosedDay = weekDays[choosedDayIndex]

        copy.map((item, index) => {
            if (item.isSelected) {
                item.isSelected = false
            }

            if (index == choosedDayIndex) {
                item.isSelected = true
            }
        })

        setDaySelected(day)
        setDateSelected(choosedDay?.iso)
        setWeekDays(copy)
    }

    const downloadExcel = async(type: string) => {
        try {
            const res = await fetch(`${apiUrl}/api/weather/export.${type}`, {
                method: "GET"
            })

            if (!res.ok) {
                toast.error("Erro no download! Tente novamente mais tarde!")
                throw new Error("Erro ao baixar arquivo")
            }

            const blob = await res.blob()
            const url = window.URL.createObjectURL(blob)

            const a = document.createElement("a")
            a.href = url
            a.download = `dados_clima.${type}`
            document.body.appendChild(a);
            a.click()
            a.remove()

            window.URL.revokeObjectURL(url)

        } catch (err) {
            toast.error("Erro no download! Tente novamente mais tarde!")
            console.error(err);
        }
    }


    return (
        <>
            <PageTemplate>
                <div className="flex pl-2 md:pl-0 md:m-auto md:w-min flex-col md:gap-2 pt-10">
                    <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between md:items-center">
                        <span className="text-xl">Nova Alvorada do Sul - MS</span>
                        <div className="flex justify-center">
                            <Button onClick={() => downloadExcel("xlsx")} className="bg-[#273A57] text-white" variant="outline">
                                Download .xlsx
                                <Download />
                            </Button>
                            <Button onClick={() => downloadExcel("csv")} className="bg-[#273A57] text-white" variant="outline">
                                Download .csv
                                <Download />
                            </Button>
                        </div>
                    </div>
                    <div className="w-full flex md:justify-center mt-3 mb-2 md:mt-4">
                        {weatherDay ? (
                            <>
                                <ButtonGroup className="hidden md:flex">
                                    {weekDays.map((actualDay, key) => (
                                        <>
                                            <Button onClick={() => selectNewDay(actualDay.day)} key={key} className={`${key == daySelected ? "bg-[#dc914b] font-bold hover:bg-[#dc914b] hover:text-white" : "bg-[#F4A153] hover:bg-[#dc914b] hover:text-white"} text-white`} variant="outline">{actualDay.nameDay}</Button>
                                        </>
                                    ))}
                                </ButtonGroup>
                                <div className="md:hidden" style={{color: "white !important"}}>
                                    <Select defaultValue={String(daySelected)}>
                                        <SelectTrigger className="w-[180px] bg-[#F4A153] [&>span]:text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Dias da Semana</SelectLabel>
                                                {weekDays.map((actualDay, key) => (
                                                    <SelectItem onClick={() => selectNewDay(actualDay.day)} key={key} value={String(key)}>{actualDay.nameDay}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="hidden md:flex">
                                    <Skeleton className="w-[600px] h-10 rounded-xl" />
                                </div>
                                <div className="md:hidden">
                                    <Skeleton className="w-45 h-5 rounded-xl" />
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="w-full">
                    <div className="px-3 md:w-9/10 m-auto mt-5 mb-5 md:mb-0">
                        {weatherDay ? (
                            <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: [40, -5, 0] }}
                            transition={{ duration: 0.8, delay: 1 * 0.1, ease: "easeOut" }}
                            >
                                <VideoTemplate weather_code={weatherDay?.weather_code}>
                                    <div className="flex flex-col md:flex-row justify-around md:items-center">
                                        <div className="flex gap-3 justify-around md:justify-start items-center">
                                            {/* <img src={nuvem} alt="Gif de núvem nublada" /> */}
                                            <video
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="pointer-events-none select-none w-40 sm:w-50 md:w-60"
                                            >
                                            <source src={getWeatherAnimationByCode(weatherDay?.weather_code)} type="video/webm" />
                                            </video>
                                            <span className="text-5xl">{Math.round(weatherDay?.temperature)}°</span>
                                        </div>
                                        <span className="text-xl">{weatherCodeToText(weatherDay?.weather_code)}</span>
                                    </div>
                                </VideoTemplate>
                            </motion.div>
                        ) : (
                            <>
                                <Skeleton className="w-full h-50 m-auto" />
                            </>
                        )}
                        <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 mt-5">

                            {/* Table de dados por hora */}
                            <div className="lg:col-span-3 lg:row-span-6 order-3 lg:order-1">
                                <div className="flex justify-center">
                                    {weatherDay ? (
                                        <>
                                            <motion.div
                                                className="w-full"
                                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{
                                                    duration: 0.6,
                                                    delay: 1.5,
                                                    type: "spring",
                                                    stiffness: 120,
                                                    damping: 20
                                                }}
                                            >
                                                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg p-3 w-full">
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>Hora</TableHead>
                                                                <TableHead>Temperatura</TableHead>
                                                                <TableHead>Chuva</TableHead>
                                                                <TableHead>Vento</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {weatherLogs?.map((log, key) => {
                                                                const date = new Date(log.timestamp)

                                                                const time = date.toLocaleTimeString("pt-BR", {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                    timeZone: "UTC"
                                                                });
                                                                return (
                                                                    <>
                                                                        <TableRow key={key}>
                                                                            <TableCell>{time}</TableCell>
                                                                            <TableCell>{Math.round(log.temperature)}°</TableCell>
                                                                            <TableCell>{Math.round(log.precipitation_probability)}%</TableCell>
                                                                            <TableCell>{Math.round(log.wind_speed)} Km/h</TableCell>
                                                                        </TableRow>
                                                                    </>
                                                                )
                                                            })}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            </motion.div>
                                        </>
                                    ) : (
                                        <Skeleton className="w-full h-100 rounded-xl" />
                                    )}
                                </div>
                            </div>

                            {/* Insights */}
                            <div className="lg:col-span-4 lg:row-span-3 lg:col-start-4 order-1 lg:order-2">
                                <div className="">
                                    {weatherDay ? (
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
                                            <DataLineWeather rain={weatherDay.precipitation_probability} wind={weatherDay.wind_speed} energia={Number(weatherDay.energiaProduzida)} temperature={weatherDay.temperature} umidade={weatherDay.humidity} />
                                        </motion.div>
                                    ) : (
                                        <Skeleton className="w-full h-20 rounded-xl" />
                                    )}

                                    <div className="mt-5">
                                        {weatherDay ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{
                                                    duration: 0.6,
                                                    delay: 1.5,
                                                    type: "spring",
                                                    stiffness: 120,
                                                    damping: 20
                                                }}
                                            >
                                                <Insight content={weatherDay?.churrascometro} type="sensation"/>
                                            </motion.div>
                                        ) : (
                                            <Skeleton className="w-full h-20 rounded-xl" />
                                        )}
                                    </div>

                                    <div className="mt-5">
                                        {weatherDay ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{
                                                    duration: 0.6,
                                                    delay: 1.5,
                                                    type: "spring",
                                                    stiffness: 120,
                                                    damping: 20
                                                }}
                                            >
                                                <Insight content={weatherDay?.insightEnergia} type="energy"/>
                                            </motion.div>
                                        ) : (
                                            <Skeleton className="w-full h-20 rounded-xl" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Gráficos */}
                            {weatherDay ? (
                                <>
                                    <div className="lg:col-span-7 lg:row-span-3 lg:col-start-4 lg:row-start-4 order-3">
                                        <div className="flex flex-col lg:flex-row items-center justify-center pt-3">
                                            <motion.div
                                                className="w-full h-[600px] md:h-[300px] flex flex-col md:flex-row gap-5 lg:gap-0"
                                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{
                                                    duration: 0.6,
                                                    delay: 1,
                                                    type: "spring",
                                                    stiffness: 120,
                                                    damping: 20
                                                }}
                                            >
                                                <div className="flex-1 h-[300px] min-w-[320px] p-4">
                                                    <h3 className="text-md font-semibold lg:mb-5">
                                                        Probabilidade de chuva no dia
                                                    </h3>
                                                    <ResponsiveContainer>
                                                        <BarChart
                                                            data={rainGraficData}
                                                            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                                                        >
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="name" />
                                                            <YAxis
                                                                width={40}
                                                                domain={[0, 100]}
                                                                tickFormatter={(value) => `${value}%`}
                                                            />
                                                            <Tooltip formatter={(value) => `${value}%`} />

                                                            <Bar
                                                                dataKey="rain"
                                                                name="Probabilidade de chuva"
                                                                radius={[4, 4, 0, 0]}
                                                                fill="#273A57"
                                                            />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                                <div className="flex-1 h-[300px] p-4">
                                                    <h3 className="text-md font-semibold mb-2">
                                                        Temperatura ao longo do dia
                                                    </h3>
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <AreaChart
                                                            responsive
                                                            data={temperatureGraficData}
                                                            margin={{
                                                                top: 20,
                                                                right: 0,
                                                                left: 0,
                                                                bottom: 0,
                                                            }}
                                                            >
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis
                                                                dataKey="name"
                                                            />
                                                            <YAxis width="auto" />
                                                            <Tooltip />
                                                            <Area type="monotone" dataKey="temperatura" stroke="#F4A153" fill="#F4A153" name="Temperatura" />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <Skeleton className="md:col-span-7 md:row-span-3 md:col-start-4 md:row-start-4 order-3 w-full h-50 mb-10" />
                            )}

                            {weatherDay ? (
                                <>
                                    {/* MainInsight */}
                                    <div className="lg:col-span-3 lg:row-span-3 lg:col-start-8 lg:row-start-1 order-2 lg:order-4">
                                        <motion.div
                                            className="h-full"
                                            initial={{ opacity: 0, y: 50, rotateZ: 5, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, rotateZ: 0, scale: 1 }}
                                            transition={{ duration: 0.7, delay: 1.5, ease: "easeOut" }}
                                        >
                                            <MainInsight content={weatherDay?.insight} />
                                        </motion.div>
                                    </div>
                                </>
                            ) : (
                                <Skeleton className="md:col-span-3 md:row-span-3 md:col-start-8 md:row-start-1 order-4 w-full h-50 rounded-xl" />
                            )}

                        </div>
                    </div>
                </div>
                <div id="senhora-do-tempo" className="w-full bg-gray-100 pb-5 pt-4 px-3 mt-20 md:px-0">
                    <SenhoraDoTempo />
                </div>
                <div id="newsletter" className="w-full py-5 px-3 md:px-0">
                    <Newsletter />
                </div>
                <Toaster richColors position="top-center" />
            </PageTemplate>   
        </>
    );
}

export default App;
