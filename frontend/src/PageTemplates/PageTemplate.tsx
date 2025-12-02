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
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import type { PropsWithChildren } from "react"
import logo_trans from '../assets/logo_trans.webp'
import logo_white_trans from '../assets/logo_white_trans.webp'
import { Menu } from "lucide-react"

function PageTemplate({ children }: PropsWithChildren) {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-background text-foreground">
                <header className="flex px-5 mt-3 justify-around">
                    <a href="/">
                        <img className="w-20" src={logo_trans} alt="Logo da GASH" />
                    </a>
                    <NavigationMenu>
                        <NavigationMenuList className="hidden md:flex">
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
                        <NavigationMenuList className="md:hidden">
                            <NavigationMenuItem>
                                <Sheet>
                                    <SheetTrigger>
                                        <Button variant="outline">
                                            <Menu />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-64 bg-white">
                                        <nav className="flex flex-col gap-4 mt-10 text-lg pl-2">
                                            <a href="/" className="hover:text-brand-primary">Home</a>
                                            <a href="/#newsletter" className="hover:text-brand-primary">Newsletter</a>
                                            <a href="/explorar" className="hover:text-brand-primary">Explorar</a>
                                            <a href="/#senhora-do-tempo" className="hover:text-brand-primary">Senhora do Tempo</a>
                                            <a href="/login" className="border rounded-[5px] p-2">
                                                Faça Login
                                            </a>
                                        </nav>
                                    </SheetContent>
                                </Sheet>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </header>
                <main className="flex-1">
                    {children}
                </main>
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
            </div>
            
        </>
    )
}

export default PageTemplate