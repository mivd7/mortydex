import { FC } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Character } from "rickmortyapi"
import Image from "next/image";

interface Props {
  character: Character;
}

const CharacterCard: FC<Props> = ({character}) => {
  return(
      <Card className="cursor-pointer">
        <CardHeader>
          <Image alt={character.name} src={character.image} width={1000} height={1000} className="object-center max-w-full" priority/>
        </CardHeader>
        <CardContent>
          <CardTitle>{character.name}</CardTitle>
          <CardDescription>Location: {character.location.name}</CardDescription>
          <CardDescription>Status: {character.status}</CardDescription>
        </CardContent>
      </Card>
  )
}

export default CharacterCard