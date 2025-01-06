import CharacterEpisodeList from "@/components/CharacterEpisodeList";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation"
import { FC } from "react";
import { getCharacter, getEpisode, getEpisodes, getLocation } from "rickmortyapi"
import CharacterCardContainer from "@/components/CharacterCardContainer";
import { HomeIcon } from "lucide-react";

export const getResidentIdFromUrl = (characterUrl: string) => {
  const split = characterUrl.split('/');
  return Number(split[split.length - 1])
}

export default async function EpisodeDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  if(!id) {
    return notFound();
  }

  const location = await getLocation(Number(id)).then(res => res.data).catch(err => console.error(err));
  if(!location) {
    return notFound();
  }

  const locationResidentIds = location.residents.map(residentUrl => getResidentIdFromUrl(residentUrl))
  const characters = await getCharacter(Array.isArray(locationResidentIds) ? locationResidentIds : locationResidentIds[0]).then(res => res.data).catch(err => console.error(err));
  console.log('locationResidentIds', locationResidentIds)
  console.log('characters', characters)
  if(!characters) {
    return notFound()
  }

  return(
    <main className="min-h-screen bg-slate-950 py-5 relative">
      <Link href="/" className="cursor-pointer absolute top-5 left-5">
          <HomeIcon className="text-white w-8 h-8"/>
      </Link>
      <header className="flex flex-col items-center mx-auto gap-2 pb-5 border-b border-white w-full lg:pt-0 pt-10">
        <h1 className="text-6xl text-lime-500">{location.name}</h1>
        <p className="text-white text-xl">Type: {location.type}</p>
        <p className="text-white text-xl">Dimension: {location.dimension}</p>
      </header>
      {characters?.length && <div className="container mx-auto py-5">
        <h3 className="text-4xl text-lime-300 font-bold mb-5">Characters located in {location.name}</h3>
        {characters && <CharacterCardContainer characters={Array.isArray(characters) ? characters : [characters]}/>}
      </div>}
    </main>
  )
}