import CharacterEpisodeList from "@/components/CharacterEpisodeList";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation"
import { FC } from "react";
import { getCharacter } from "rickmortyapi"

const CharacterInfoLine: FC<{heading: string, text: string}> = ({heading, text}) =>
  <div>
    <h3 className="text-2xl text-lime-300 font-bold">{heading}</h3>
    <p className="text-xl text-white">{text}</p>
  </div>

const getEpisodeIdFromUrl = (episodeUrl: string) => {
  const split = episodeUrl.split('/');
  return Number(split[split.length - 1])
}

export default async function CharacterDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  if(!id) {
    return notFound();
  }

  const character = await getCharacter(Number(id)).then(res => res.data).catch(err => console.error(err));
  if(!character) {
    return notFound();
  }

  return(
    <main className="min-h-screen bg-slate-950 py-5">
      <header className="flex flex-col items-center mx-auto gap-5 pb-5 border-b border-white w-full">
        <Image src={character.image} alt={character.name} width={300} height={300}/>
        <h1 className="text-6xl text-lime-500">{character.name}</h1>
      </header>
      <div className="container pt-5 mx-auto flex divide-x-2">
        <div className="flex flex-col gap-2 w-1/2">
          {character.species && <CharacterInfoLine heading="Species" text={character.species}/>}
          {character.gender && <CharacterInfoLine heading="Gender" text={character.gender}/>}
          {character.origin && <CharacterInfoLine heading="Origin" text={character.origin.name}/>}
          {character.location && <CharacterInfoLine heading="Location" text={character.location.name}/>}
          {character.gender && <CharacterInfoLine heading="Dimension" text={character.gender}/>}
          {character.status && <CharacterInfoLine heading="Status" text={character.status}/>}
        </div>
        <div className="text-white w-1/2 flex pl-5">
          {character.episode.length && 
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl text-lime-300 font-bold">Last episodes featuring {character.name}</h3>
              <div className="grid grid-cols-2 gap-4">
                <CharacterEpisodeList episodeIds={character.episode.slice(-4).map(episodeUrl => getEpisodeIdFromUrl(episodeUrl))}/>
              </div>
              <Link className="underline text-lime-300" href="/episodes">See all episodes</Link>
            </div>
          }
        </div>
      </div>
    </main>
  )
}