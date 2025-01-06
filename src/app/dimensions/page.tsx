import DimensionInput from "@/components/DimensionInput";
import { getCharacter, getLocations } from "rickmortyapi";
import { getResidentIdFromUrl } from "../locations/[id]/page";
import CharacterCardContainer from "@/components/CharacterCardContainer";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

export default async function Home(props: {
  searchParams?: Promise<{
    page?: string
    dimension?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const dimension = searchParams?.dimension || '';
  const dimensionLocations = await getLocations({dimension}).then(res => res.data).catch(err => console.error(err));
  const residentIds = [...new Set(dimensionLocations?.results?.flatMap(location => location.residents))].map(url => getResidentIdFromUrl(url));
  const characters = await getCharacter(residentIds).then(res => res.data).catch(err => console.error(err));

  return (
      <main className="flex flex-col py-10 relative">
        <Link href="/" className="cursor-pointer absolute top-5 left-5">
          <HomeIcon className="w-8 h-8"/>
        </Link>
        <header className="container mx-auto mb-2">
          <h1 className="text-5xl font-bold">Mortydex</h1>
          <p className="mb-2">Find characters by dimension</p>
          <DimensionInput/>
        </header>

        <div className="container mx-auto mt-5">
          {!dimensionLocations?.results && <p>No results found for "{dimension}"</p>}
          {dimension && characters?.length && <>
            <h3 className="text-4xl font-bold mb-5">Characters in dimension {dimension}</h3>
            {characters && <CharacterCardContainer characters={characters}/>}
          </>}
        </div>
        
      </main>
  );
}
