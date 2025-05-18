export interface Author {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  isbn: string;
  image?: string;
  authors: Author[];
}