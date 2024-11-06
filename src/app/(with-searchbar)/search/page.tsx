import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import delay from "@/util/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`
  );
  if (!response.ok) {
    return <div>Failed to fetch books</div>;
  }
  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

const SearchParamsResolver = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const resolvedParams = await searchParams;
  return <SearchResult q={resolvedParams.q || ""} />;
};

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsResolver searchParams={searchParams} />
    </Suspense>
  );
}
