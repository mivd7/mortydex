import Link from "next/link";
import { notFound } from "next/navigation"
import { getCharacter, getLocation } from "rickmortyapi"
import CharacterCardContainer from "@/components/CharacterCardContainer";
import { HomeIcon } from "lucide-react";

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

  if(!characters) {
    return notFound()
  }

  return(
    <main className="min-h-screen bg-slate-950 py-5 relative">
      <Link href="/" className="cursor-pointer absolute top-5 left-5">
          <HomeIcon className="text-white w-8 h-8"/>
      </Link>
      <header className="flex flex-col items-center mx-auto gap-2 pb-5 border-b border-white w-full lg:pt-0 pt-10">
        <h1 className="text-3xl lg:text-6xl text-lime-500">{location.name}</h1>
        <p className="text-white text-md lg:text-xl">Type: {location.type}</p>
        <p className="text-white text-md lg:text-xl">Dimension: {location.dimension}</p>
      </header>
      {characters?.length && <div className="container mx-auto py-5 px-5 lg:px-0">
        <h3 className="text-2xl lg:text-4xl text-lime-300 font-bold mb-5">Characters located in {location.name}</h3>
        {characters && <CharacterCardContainer characters={Array.isArray(characters) ? characters : [characters]}/>}
      </div>}
    </main>
  )
}

const getResidentIdFromUrl = (characterUrl: string) => {
  const split = characterUrl.split('/');
  return Number(split[split.length - 1])
}
