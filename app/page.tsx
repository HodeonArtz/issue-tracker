import Pagination from "./components/Pagination";

export default async function Home({
  searchParams: toAwaitSearchParams,
}: {
  searchParams: { page: string };
}) {
  const searchParams = await toAwaitSearchParams;
  return (
    <Pagination
      itemCount={100}
      pageSize={10}
      currentPage={+searchParams.page}
    />
  );
}
