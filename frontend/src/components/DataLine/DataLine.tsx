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
    const iconSize = 25

    return (
        <>
            <div className="bg-[#F4A153] p-5 flex gap-3 rounded-[5px] text-white text-md">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-1">
                            <Thermometer size={iconSize} />
                            <span>{temperature}°</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent >
                        <p>Temperatura média no dia</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-1">
                            <Cloud size={iconSize} />
                            <span>{rain}%</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent >
                        <p>Chance de chuva</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-1">
                            <Droplet size={iconSize} />
                            <span>{umidade}%</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent >
                        <p>Umidade do ar</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-1">
                            <Zap size={iconSize} />
                            <span>{energia}kWh</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent >
                        <p>Energia produzida</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-1">
                            <Wind size={iconSize} />
                            <span>{wind}Km/h</span>
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