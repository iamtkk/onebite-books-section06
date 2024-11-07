import BookItemSkeleton from './book-item-skeleton';

const BookListSkeleton = ({ count }: { count: number }) => {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <BookItemSkeleton key={idx} />);
};
export default BookListSkeleton;
