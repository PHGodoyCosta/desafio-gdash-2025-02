import { Lightbulb } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type MainInsightType = {
    content: string
}

function MainInsight({ content }: MainInsightType) {
    return (
        <>
            <div className="bg-[#F4A153] h-full p-3 gap-3 rounded-[5px] text-white text-md lg:max-w-90">
                <div className="pb-3">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center gap-1">
                                <Lightbulb size={30} />
                                <span className="font-bold">Senhora do Tempo</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent >
                            <p>Uma opinião da Senhora do Tempo sobre o tempo de hoje</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <p>{content}</p>
            </div>
        </>
    )
}

export default MainInsight