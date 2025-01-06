import { FC } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Character } from "rickmortyapi"
import Image from "next/image";

interface Props {
  character: Character;
}

const CharacterCard: FC<Props> = ({character}) => {
  return(
      <Card className="cursor-pointer shadow-lg transition-all duration-700 hover:scale-105">
        <CardHeader>
          <Image alt={character.name} src={character.image} width={300} height={300} className="object-center max-w-full" priority/>
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