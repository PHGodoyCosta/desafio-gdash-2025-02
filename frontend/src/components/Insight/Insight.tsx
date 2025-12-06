import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Zap, Beef } from 'lucide-react'

type InsightType = {
    type: "sensation" | "energy",
    content: string,
}

function Insight({ type, content }: InsightType) {
    const iconSize = 25

    return (
        <>
            <div className="bg-[#273A57] p-5 flex gap-3 rounded-[5px] text-white text-md">
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {type == "sensation" ? (
                                <>
                                    <Beef className="min-w-8 size-6" size={iconSize} />
                                </>
                            ) : (
                                <>
                                    <Zap className="min-w-8 size-6" size={iconSize} />
                                </>
                            )}
                        </TooltipTrigger>
                        <TooltipContent >
                            {type == "sensation" ? (
                                <>
                                    <p>Churrascometro: uma métrica de quão bom o tempo está para um churrasco</p>
                                </>
                            ) : (
                                <>
                                    <p>Um insight sobre a produção de energia hoje</p>
                                </>
                            )}
                        </TooltipContent>
                    </Tooltip>
                    <span>{content}</span>
                </div>
            </div>
        </>
    )
}

export default Insight