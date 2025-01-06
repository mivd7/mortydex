import { FC } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Character, Episode, Location } from "rickmortyapi"
import Image from "next/image";

interface Props {
  location: Location;
}

const LocationCard: FC<Props> = ({location}) => {
  return(
      <Card className="cursor-pointer shadow-lg transition-all duration-700 hover:scale-105 h-full">
        <CardHeader>
          <CardTitle>{location.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Dimension: {location.dimension}</CardDescription>
          <CardDescription>Type: {location.type}</CardDescription>
        </CardContent>
      </Card>
  )
}

export default LocationCard