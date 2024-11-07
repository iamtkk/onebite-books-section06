import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import delay from '@/util/delay';
import { Suspense } from 'react';

async function SearchResult({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${resolvedParams.q}`
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

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResult searchParams={searchParams} />
    </Suspense>
  );
}
