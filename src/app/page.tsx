import CharacterCardContainer from "@/components/CharacterCardContainer";
import CharacterPagination from "@/components/CharacterPagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCharacters } from "rickmortyapi";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    location?: string;
    locationPage?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const allCharacters = await getCharacters({page: currentPage}).then(res => res.data).catch(err => console.error(err));
  const totalPages = allCharacters?.info?.pages;

  return (
      <main className="container flex flex-col mx-auto py-10">
        <div className="mb-2">
          <h1 className="text-5xl font-bold">Mortydex</h1>
          <p className="mb-2">Find your favorite character in any location or dimension</p>
          <div className="flex justify-between">
            <Link href="/locations">
              <Button>Browse by locations</Button>
            </Link>
            <Link href="/dimensions">
              <Button>Browse by dimensions</Button>
            </Link>
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-5">All characters</h3>
        <CharacterCardContainer currentPage={currentPage} characters={allCharacters?.results} totalPages={totalPages}/>
        <div className="flex items-center mt-5">
          {totalPages && <CharacterPagination totalPages={totalPages} currentPage={currentPage}/>}
        </div>
      </main>
  );
}
