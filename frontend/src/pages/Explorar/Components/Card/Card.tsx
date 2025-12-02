import {
  Item,
  ItemContent,
  ItemHeader,
  ItemTitle,
  ItemMedia
} from "@/components/ui/item"

export type CardProps = {
    id: number,
    name: string,
    image: string,
    status: string,
    genero?: string,
    origem?: string,
    ultimoLocal: string,
    primeiroVistoEm: string
}

export function Card(props: CardProps) {
    return (
        <>
            <Item className="flex-row items-start md:items-center gap-2 w-full sm:max-w-40 md:max-w-55" key={props.name} variant="outline">
                <ItemMedia className="md:hidden w-40 h-40 max-w-full shrink-0" variant="image">
                    <a href={`/explorar/personagem/${props.id}`}>
                        <img
                            src={props.image}
                            alt={props.name}
                            className="aspect-square rounded-sm"
                        />
                    </a>
                </ItemMedia>
                <ItemHeader className="hidden md:flex">
                    <a href={`/explorar/personagem/${props.id}`}>
                        <img
                            src={props.image}
                            alt={props.name}
                            className="aspect-square w-50 rounded-sm object-cover"
                        />
                    </a>
                </ItemHeader>
                <ItemContent>
                    <a href={`/explorar/personagem/${props.id}`}>
                        <ItemTitle className="text-lg font-bold">{props.name}</ItemTitle>
                    </a>
                    <div className="mt-1">
                        <div className="mb-1 md:mb-3">
                            <h3 className="text-muted-foreground text-md">Status</h3>
                            <p>{props.status}</p>
                        </div>
                        <div className="mb-1 md:mb-3">
                            <h3 className="text-muted-foreground text-md">Ultimo local visto</h3>
                            <p>{props.ultimoLocal}</p>
                        </div>
                        <div className="mb-1 md:mb-3">
                            <h3 className="text-muted-foreground text-md">Primeira vez visto em</h3>
                            <p>{props.primeiroVistoEm}</p>
                        </div>
                    </div>  
                    {/* <ItemDescription>{props.description}</ItemDescription> */}
                </ItemContent>
            </Item>
        </>
    )
}