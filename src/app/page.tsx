import CharacterCardContainer from "@/components/CharacterCardContainer";
import CharacterPagination from "@/components/CharacterPagination";
import { getCharacters } from "rickmortyapi";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const data = await getCharacters({page: currentPage }).then(res => res.data).catch(err => console.error(err));
  const characters = data?.results;
  const totalPages = data?.info?.pages;
  return (
    <div>
      <main className="container flex flex-col mx-auto py-10">
        <div className="mb-5">
          <h1 className="text-5xl font-bold">Mortydex</h1>
          <p>Find your favorite character in the universe</p>
        </div>
        <CharacterCardContainer currentPage={currentPage} characters={characters} totalPages={data?.info?.pages}/>
        <div className="flex items-center mt-5">
          {totalPages && <CharacterPagination totalPages={totalPages} currentPage={currentPage}/>}
        </div>
      </main>
    </div>
  );
}
