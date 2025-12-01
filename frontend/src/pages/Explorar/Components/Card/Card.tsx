import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
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
            <Item className="max-w-55" key={props.name} variant="outline">
                <ItemHeader>
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
                        <div className="mb-3">
                            <h3 className="text-muted-foreground text-md">Status</h3>
                            <p>{props.status}</p>
                        </div>
                        <div className="mb-3">
                            <h3 className="text-muted-foreground text-md">Ultimo local visto</h3>
                            <p>{props.ultimoLocal}</p>
                        </div>
                        <div className="mb-3">
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