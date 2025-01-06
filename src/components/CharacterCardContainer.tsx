import { FC } from "react";
import { Character } from "rickmortyapi";
import CharacterCard from "./CharacterCard";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  characters: Character[] | undefined;
  totalPages?: number;
  currentPage?: number;
}

const CardContainer: FC<Props> = ({characters}) => {
  if(!characters) {
    return notFound()
  }
  return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
        {characters?.length && characters.map(character => <Link key={character.id} href={`/characters/${character.id}`}><CharacterCard character={character}/></Link>)}
      </div>
  )
}

export default CardContainer;