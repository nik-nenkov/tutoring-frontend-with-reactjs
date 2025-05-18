import { useState } from 'react';
import { suggestAuth } from '../services/authorService';

export function useAuthors() {
  const [authorSuggest, setAuthorSuggest] = useState([]);
  const [currentAuthor, setCurrentAuthor] = useState({ name: "" });

  const searchAuthors = async (query, excludeAuthors) => {
    if (query.length < 1) {
      setAuthorSuggest([]);
      return;
    }
    const result = await suggestAuth(query, excludeAuthors);
    setAuthorSuggest([currentAuthor, ...result]);
  };

  return {
    authorSuggest,
    setAuthorSuggest,
    currentAuthor,
    setCurrentAuthor,
    searchAuthors,
  };
}