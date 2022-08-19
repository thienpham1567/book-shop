import { Product as Book } from '@chec/commerce.js/types/product.js';

export const getBooksByCategory = (
  books: Book[],
  {
    categories,
  }: {
    categories: string[];
  },
): Book[] => {
  const data: Book[] = [];
  books.forEach((book: Book) => {
    const results: boolean[] = book.categories.map(
      (cate: { id: string; name: string; slug: string }) =>
        categories.includes(cate.slug),
    );
    if (categories.length <= 1) {
      (results[0] || results[1]) && data.push(book);
    } else {
      results[0] && results[1] && data.push(book);
    }
  });
  return data;
};
