import React, { useState } from 'react';

import './resources/App.css';
import BookRow from './components/BookRow';
import Title from './components/Title';
import Footer from './components/Footer';
import BookAddingWizard from './components/BookAddingWizard';
import { useBooks } from './hooks/useBooks';
import { useAuthors } from './hooks/useAuthors';

function App() {
  const [isWizardOpened, setIsWizardOpened] = useState(false);
  const [wizardPage, setWizardPage] = useState(1);
  const [currentBook, setCurrentBook] = useState({ id: 0, title: "", isbn: "", authors: [] });

  const { books, addBook, deleteBook, setBooks } = useBooks();
  const {
    authorSuggest,
    setAuthorSuggest,
    currentAuthor,
    setCurrentAuthor,
    searchAuthors,
  } = useAuthors();

  const onTitleChange = e => setCurrentBook({ ...currentBook, title: e.target.value });
  const onIsbnChange = e => setCurrentBook({ ...currentBook, isbn: e.target.value });

  const onAuthorChange = e => {
    setCurrentAuthor({ name: e.target.value });
    searchAuthors(e.target.value, currentBook.authors);
  };

  const addBookHandler = async () => {
    if (currentBook.title === "") {
      window.alert("Title can not be an empty field!");
      return;
    }
    try {
      const result = await addBook(currentBook);
      setCurrentBook({ id: 0, title: "", isbn: "", authors: [] });
      setCurrentAuthor({ name: "" });
      setAuthorSuggest([]);
      setIsWizardOpened(false);
      setWizardPage(1);
    } catch (e) {
      window.alert("Something went wrong");
    }
  };

  const addAuthor = (author) => {
    if (author.name !== "") {
      setCurrentBook({
        ...currentBook,
        authors: [...currentBook.authors, { id: author.id, name: author.name }]
      });
      setCurrentAuthor({ name: "" });
      setAuthorSuggest([]);
    }
  };

  const clearSelection = (authName) => {
    setCurrentBook({
      ...currentBook,
      authors: currentBook.authors.filter(auth => auth.name !== authName)
    });
    setCurrentAuthor({ name: "" });
    setAuthorSuggest([]);
  };

  const authorKeyPress = (e) => {
    if (e.key === 'Enter') {
      addAuthor(currentAuthor);
    }
  };

  const closeWizard = () => {
    setIsWizardOpened(false);
    setWizardPage(1);
    setCurrentBook({ id: 0, title: "", isbn: "", authors: [] });
    setCurrentAuthor({ name: "" });
  };

  const openWizard = () => setIsWizardOpened(!isWizardOpened);

  const partTwo = () => {
    if (currentBook.title === "") {
      window.alert("Title can not be an empty field!");
    } else {
      setWizardPage(2);
    }
  };

  const deleteBookHandler = (id) => {
    if (window.confirm('Are you sure you want to DELETE this book?')) {
      deleteBook(id);
    }
  };

  return (
    <div className="App">
      <Title />
      <br />
      You have {books.length}&nbsp;
      {books.length === 1 ? "book" : "books"} in your library!
      <br /><br />
      <div onClick={openWizard} className="customButton2">Add new book</div>
      <br />
      <BookAddingWizard
        currentBook={currentBook}
        currentAuthor={currentAuthor}
        authorSuggest={authorSuggest}
        onTitleChange={onTitleChange}
        onIsbnChange={onIsbnChange}
        onAuthorChange={onAuthorChange}
        authorKeyPress={authorKeyPress}
        clearSelection={clearSelection}
        addAuthor={addAuthor}
        addBook={addBookHandler}
        isWizardOpened={isWizardOpened}
        closeWizard={closeWizard}
        wizardPage={wizardPage}
        partTwo={partTwo}
      />
      <br /><br /><br />
      <div id="bookList">
        {books.length === 0 ? <h2>The list is empty!</h2> : <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Book Title</th>
              <th>ISBN</th>
              <th>Author(s)</th>
              <th></th>
              <th></th>
            </tr>
            {books.map((e, i) => (
              <BookRow key={i} book={e} delete={() => deleteBookHandler(e.id)} />
            ))}
          </tbody>
        </table>}
      </div>
      <br /><br /><br />
      <Footer />
    </div>
  );
}

export default App;