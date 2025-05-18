import { apiRequest } from './apiClient';
import type { Author } from '../types/api';

// GET /authors?s={query}
export async function suggestAuth(query = "", excludeAuthors: Author[] = []): Promise<Author[]> {
  const authors = await apiRequest<Author[]>(`/authors?s=${encodeURIComponent(query)}`);
  if (excludeAuthors.length > 0) {
    return authors.filter(
      auth => !excludeAuthors.some(selected => selected.id === auth.id)
    );
  }
  return authors;
}