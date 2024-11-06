import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import delay from '@/util/delay';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  // await delay(3000);
  const { q } = await searchParams;
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
