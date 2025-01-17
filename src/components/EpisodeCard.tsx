import { FC } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Episode } from "rickmortyapi"

interface Props {
  episode: Episode;
}

const CharacterCard: FC<Props> = ({episode}) => {
  return(
      <Card className="cursor-pointer shadow-lg transition-all duration-700 hover:scale-105 h-full">
        <CardHeader>
          <CardTitle>{episode.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Episode number: {episode.episode}</CardDescription>
          <CardDescription>Air Date: {episode.air_date}</CardDescription>
        </CardContent>
      </Card>
  )
}

export default CharacterCard