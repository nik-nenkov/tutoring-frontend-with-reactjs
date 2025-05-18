import { apiRequest } from './apiClient';
import type { Book } from '../types/api';

// GET /books?o={order}
export async function listAllBooks(order = ""): Promise<Book[]> {
  const query = order ? `?o=${encodeURIComponent(order)}` : "";
  return apiRequest<Book[]>(`/books${query}`);
}

// POST /books
export async function saveBook(book: Omit<Book, 'id'>): Promise<Book> {
  return apiRequest<Book>('/books', {
    method: 'POST',
    body: JSON.stringify(book),
  });
}

// GET /books/{id}
export async function showOneBook(id: number): Promise<Book> {
  return apiRequest<Book>(`/books/${id}`);
}

// DELETE /books/{id}
export async function deleteBook(id: number): Promise<string> {
  return apiRequest<string>(`/books/${id}`, {
    method: 'DELETE',
  });
}