import { FC } from "react";
import { getCharacters } from "rickmortyapi";
import CharacterCard from "./CharacterCard";
import CharacterPagination from "./CharacterPagination";
import Link from "next/link";

interface Props {
  currentPage?: number;
}

const CardContainer: FC<Props> = async ({currentPage = 1}) => {
  const data = await getCharacters({page: currentPage}).then(res => res.data).catch(err => console.error(err));
  const characters = data?.results;
  return (
    <div className="w-full flex flex-col gap-5">
      <p className="text-lg font-bold">Total results: {data?.info?.count}</p>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {characters?.length && characters.map(character => <Link key={character.id} href={`/characters/${character.id}`}><CharacterCard character={character}/></Link>)}
      </div>
      <div className="flex items-center">
        {data?.info?.pages && <CharacterPagination totalPages={data?.info?.pages} currentPage={currentPage}/>}
      </div>
    </div>
  )
}

export default CardContainer;