import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Zap, Lightbulb } from 'lucide-react'

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
                                    <Lightbulb size={iconSize + 5} />
                                </>
                            ) : (
                                <>
                                    <Zap size={iconSize} />
                                </>
                            )}
                        </TooltipTrigger>
                        <TooltipContent >
                            {type == "sensation" ? (
                                <>
                                    <p>Um insight sobre a senação térmica</p>
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