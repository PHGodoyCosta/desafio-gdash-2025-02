import { Beef } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type ChurrascometroType = {
    content: string
}

function Churrascometro({ content }: ChurrascometroType) {
    return (
        <>
            <div className="bg-[#F4A153] p-3 gap-3 rounded-[5px] text-white text-md max-w-90">
                <div className="pb-3">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center gap-1">
                                <Beef size={25} />
                                <span className="font-bold">Churrascometro</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent >
                            <p>Uma métrica de quão bom o tempo está para um churrasco</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <p>{content}</p>
            </div>
        </>
    )
}

export default Churrascometro