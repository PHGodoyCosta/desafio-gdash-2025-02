import {
    NavigationMenu,
    NavigationMenuContent,
    //NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    //NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import type { PropsWithChildren } from "react"
import logo_trans from '../assets/logo_trans.webp'
import logo_white_trans from '../assets/logo_white_trans.webp'

function PageTemplate({ children }: PropsWithChildren) {
    return (
        <>
            <header className="flex px-5 mt-3 justify-around">
                <a href="/">
                    <img className="w-20" src={logo_trans} alt="Logo da GASH" />
                </a>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <a href="/">Home</a>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <a href="/#newsletter">Newsletter</a>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <a href="/explorar">Explorar</a>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <a href="/#senhora-do-tempo">Senhora do Tempo</a>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <a href="/login" className="border rounded-[5px] p-2">
                            Faça Login
                        </a>
                    </NavigationMenuList>
                </NavigationMenu>
            </header>
            {children}
            <footer className="bg-[#2D455B] py-5">
                <div className="flex justify-around">
                    <a href="/">
                        <img className="w-20" src={logo_white_trans} alt="Logo da GDASH" />
                    </a>
                    <NavigationMenu className="text-white">
                        <NavigationMenuList className="flex-col items-start">
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <a href="/">Home</a>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <a href="/#newsletter">Newsletter</a>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <a href="/explorar">Explorar</a>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <a href="/#senhora-do-tempo">Senhora do Tempo</a>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <a href="/login" className="border rounded-[5px] p-2">
                                Faça Login
                            </a>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <p className="text-center font-bold text-white">@  2025 -  Desafio GDASH - Pedro Henrique Godoy Costa</p>
            </footer>
        </>
    )
}

export default PageTemplate