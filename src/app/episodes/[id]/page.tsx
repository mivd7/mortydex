
import Link from "next/link";
import { notFound } from "next/navigation"
import { getCharacter, getEpisode } from "rickmortyapi"
import CharacterCardContainer from "@/components/CharacterCardContainer";
import { HomeIcon } from "lucide-react";

const getCharacterIdFromUrl = (characterUrl: string) => {
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

  const episode = await getEpisode(Number(id)).then(res => res.data).catch(err => console.error(err));
  if(!episode) {
    return notFound();
  }

  const episodeCharacterIds = episode.characters.map(characterUrl => getCharacterIdFromUrl(characterUrl))
  const characters = await getCharacter(Array.isArray(episodeCharacterIds) ? episodeCharacterIds : [episodeCharacterIds]).then(res => res.data).catch(err => console.error(err));
  if(!characters) {
    return notFound()
  }

  return(
    <main className="min-h-screen bg-slate-950 py-5 relative">
      <Link href="/" className="cursor-pointer absolute top-5 left-5">
          <HomeIcon className="text-white w-8 h-8"/>
      </Link>
      <header className="flex flex-col items-center mx-auto gap-2 pb-5 border-b border-white w-full">
        <h1 className="text-6xl text-lime-500">{episode.name}</h1>
        <p className="text-white text-xl">Episode: {episode.episode}</p>
        <p className="text-white text-xl">Aired: {episode.air_date}</p>
      </header>
      <main className="container mx-auto py-5">
        <h3 className="text-4xl text-lime-300 font-bold mb-5">Characters featured in this episode</h3>
        {characters && <CharacterCardContainer characters={Array.isArray(characters) ? characters : [characters]}/>}
      </main>
    </main>
  )
}