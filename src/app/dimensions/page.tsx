import DimensionInput from "@/components/DimensionInput";
import { getCharacter, getLocations } from "rickmortyapi";
import { getResidentIdFromUrl } from "../locations/[id]/page";
import CharacterCardContainer from "@/components/CharacterCardContainer";

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
  console.log(dimensionLocations);
  const residentIds = [...new Set(dimensionLocations?.results?.flatMap(location => location.residents))].map(url => getResidentIdFromUrl(url));
  console.log(residentIds)
  const characters = await getCharacter(residentIds).then(res => res.data).catch(err => console.error(err));

  return (
      <main className="container flex flex-col mx-auto py-10">
        <div className="mb-2">
          <h1 className="text-5xl font-bold">Mortydex</h1>
          <p className="mb-2">Find characters by dimension</p>
        </div>
        <DimensionInput/>
        <div className="mt-5">
        {!dimensionLocations?.results && <p>No results found for "{dimension}"</p>}
        {characters?.length && <>
          <h3 className="text-4xl font-bold mb-5">Characters in dimension {dimension}</h3>
          {characters && <CharacterCardContainer characters={characters}/>}
        </>}
        </div>
        
      </main>
  );
}
