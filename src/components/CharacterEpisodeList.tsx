import { FC } from "react";
import { getEpisode } from "rickmortyapi";
import EpisodeCard from "./EpisodeCard";
import CharacterPagination from "./CharacterPagination";
import Link from "next/link";

interface Props {
  episodeIds: number[]
}

const CharacterEpisodeList: FC<Props> = async ({episodeIds}) => {
  const episodes = await getEpisode(episodeIds).then(res => res.data).catch(err => console.error(err));
  return episodes?.length && episodes.map(episode => 
    <Link key={episode.id} href={`/episodes/${episode.id}`} className="h-full">
      <EpisodeCard episode={episode}/>
    </Link>)
}

export default CharacterEpisodeList;