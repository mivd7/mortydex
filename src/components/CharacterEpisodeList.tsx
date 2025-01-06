import { FC } from "react";
import { getEpisode } from "rickmortyapi";
import EpisodeCard from "./EpisodeCard";
import CharacterPagination from "./CharacterPagination";
import Link from "next/link";

interface Props {
  episodeIds: number[]
}

const CharacterEpisodeList: FC<Props> = async ({episodeIds}) => {
  console.log('episodeIds', episodeIds)
  const episodeData = await getEpisode(episodeIds.length > 1 ? episodeIds : episodeIds[0]).then(res => res.data).catch(err => console.error(err));
  
  if(!episodeData) {
    return <p>No episodes found</p>
  }

  return Array.isArray(episodeData) ? episodeData.map(episode => 
    <Link key={episode.id} href={`/episodes/${episode.id}`} className="h-full">
      <EpisodeCard episode={episode}/>
    </Link>) : 
    <Link href={`/episodes/${episodeData.id}`} className="h-full">
      <EpisodeCard episode={episodeData}/>
    </Link>
}

export default CharacterEpisodeList;