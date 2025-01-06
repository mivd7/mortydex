import CharacterPagination from "@/components/CharacterPagination";
import DimensionSelect from "@/components/DimensionSelect";
import LocationCard from "@/components/LocationCard";
import { HomeIcon } from "lucide-react";
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

  return (
      <main className="relative flex flex-col mx-auto py-10">
        <Link href="/" className="cursor-pointer absolute top-5 right-5 lg:left-5">
          <HomeIcon className="w-8 h-8"/>
        </Link>
        <div className="container mx-auto mb-2">
          <h1 className="text-5xl font-bold">Mortydex</h1>
          <p className="mb-2">Find your favorite character in any location</p>
        </div>
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-5">All locations</h3>
          <div className="container grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">{allLocations?.results?.map(location => 
            <Link key={location.id} href={`/locations/${location.id}`}>
              <LocationCard location={location}/>
            </Link>)}
          </div>
        </div>
  
        <div className="flex items-center mt-5">
          {allLocations?.info?.pages! > 1 && <CharacterPagination totalPages={allLocations?.info?.pages!} currentPage={currentPage}/>}
        </div>
      </main>
  );
}
