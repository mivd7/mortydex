import CharacterCardContainer from "@/components/CharacterCardContainer";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div>
      <main className="container flex flex-col mx-auto py-10">
        <div className="mb-5">
          <h1 className="text-5xl font-bold">Mortydex</h1>
          <p>Find your favorite character in the universe</p>
        </div>
        <CharacterCardContainer currentPage={currentPage}/>
      </main>
    </div>
  );
}
