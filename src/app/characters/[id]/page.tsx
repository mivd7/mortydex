import CharacterEpisodeList from "@/components/CharacterEpisodeList";
import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation"
import { FC, ReactNode } from "react";
import { getCharacter, getLocation } from "rickmortyapi"

const CharacterInfoLine: FC<{heading: string, text: string | ReactNode}> = ({heading, text}) =>
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
  
  const characterLocationSplit = character.location.url.split('/')
  const characterLocationId = Number(characterLocationSplit[characterLocationSplit.length - 1]);
  const location = await getLocation(characterLocationId).then(res => res.data).catch(err => console.error(err));

  return(
    <main className="min-h-screen bg-slate-950">
      <header className="mx-auto relative py-5">
        <Link href="/" className="text-white cursor-pointer absolute top-5 right-5 lg:left-5">
          <Home className="w-8 h-8"/>
        </Link>
        <div className="container flex flex-col items-center mx-auto gap-5 border-b border-white w-full">
          <Image src={character.image} alt={character.name} width={300} height={300}/>
          <h1 className="text-6xl text-lime-500">{character.name}</h1>
        </div>
      </header>
      <div className="container pt-5 mx-auto flex flex-col lg:flex-row divide-x-2 pb-5 lg:pb-0">
        <div className="container mx-auto flex flex-col gap-2 lg:w-1/2">
          {character.species && <CharacterInfoLine heading="Species" text={character.species}/>}
          {character.gender && <CharacterInfoLine heading="Gender" text={character.gender}/>}
          {character.origin && <CharacterInfoLine heading="Origin" text={character.origin.name}/>}
          {character.location && <CharacterInfoLine heading="Location" text={character.location.name}/>}
          {character.status && <CharacterInfoLine heading="Status" text={character.status}/>}
          {location?.dimension && <CharacterInfoLine heading="Dimension" text={<Link className="hover:underline underline-offset-2" href={`/dimensions?dimension=${location.dimension}`}>{location?.dimension}</Link>}/>}
        </div>
        <div className="container mx-auto text-white lg:w-1/2 flex lg:pl-5 mt-5 lg:mt-0">
          {character.episode.length && 
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl text-lime-300 font-bold">Last episodes featuring {character.name}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CharacterEpisodeList episodeIds={character.episode.slice(-4).map(episodeUrl => getEpisodeIdFromUrl(episodeUrl))}/>
              </div>
            </div>
          }
        </div>
      </div>
    </main>
  )
}