import { Cloud, Wind, Thermometer, Droplet, Zap } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type DataLineWeatherProps = {
    temperature: number,
    umidade: number,
    rain: number,
    wind: number,
    energia: number
}

export function DataLineWeather({temperature, umidade, rain, wind, energia}: DataLineWeatherProps) {
    return (
        <>
            <div className="bg-[#F4A153] py-5 px-2 md:p-5 flex gap-1 md:gap-3 rounded-[5px] text-white text-sm justify-around">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-1">
                            <Thermometer className="size-4 lg:size-6" />
                            <span>{Math.round(temperature)}°</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent >
                        <p>Temperatura média no dia</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-1">
                            <Cloud className="size-4 lg:size-6" />
                            <span>{Math.round(rain)}%</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent >
                        <p>Chance de chuva</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-1">
                            <Droplet className="size-4 lg:size-6" />
                            <span>{Math.round(umidade)}%</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent >
                        <p>Umidade do ar</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-1">
                            <Zap className="size-4 lg:size-6" />
                            <span>{Math.round(energia)} kWh</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent >
                        <p>Produção de Energia Estimada</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-1">
                            <Wind className="size-4 lg:size-6" />
                            <span>{Math.round(wind)} Km/h</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent >
                        <p>Velocidade do vento</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </>
    )
}