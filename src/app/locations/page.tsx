import CharacterPagination from "@/components/CharacterPagination";
import DimensionSelect from "@/components/DimensionSelect";
import LocationCard from "@/components/LocationCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharacters, getLocation, getLocations } from "rickmortyapi";

export default async function Home(props: {
  searchParams?: Promise<{
    page?: string
    dimension?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const dimension = searchParams?.dimension || '';
  const allLocations = await getLocations({dimension, page: currentPage}).then(res => res.data).catch(err => console.error(err));
  if(!allLocations?.results) {
    return notFound();
  }
  const dimensionOptions = allLocations.results.map(location => location.dimension);

  return (
      <main className="container flex flex-col mx-auto py-10">
        <div className="mb-2">
          <h1 className="text-5xl font-bold">Mortydex</h1>
          <p className="mb-2">Find your favorite character in any location or dimension</p>
        </div>
        <DimensionSelect options={[...new Set(dimensionOptions)]}/>
        <h3 className="text-3xl font-bold mb-5">All locations</h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">{allLocations?.results?.map(location => 
          <Link key={location.id} href={`/locations/${location.id}`}>
            <LocationCard location={location}/>
          </Link>)}
        </div>
  
        <div className="flex items-center mt-5">
          {allLocations?.info?.pages! > 1 && <CharacterPagination totalPages={allLocations?.info?.pages!} currentPage={currentPage}/>}
        </div>
      </main>
  );
}
