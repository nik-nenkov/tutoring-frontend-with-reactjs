import { useState, useEffect } from 'react';
import { listAllBooks, saveBook as addBookService, deleteBook as deleteBookService } from '../services/bookService';

export function useBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    listAllBooks().then(setBooks).catch(console.warn);
  }, []);

  const addBook = async (book) => {
    const result = await addBookService(book);
    setBooks(prev => [...prev, result]);
    return result;
  };

  const deleteBook = async (id) => {
    await deleteBookService(id);
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  return { books, addBook, deleteBook, setBooks };
}