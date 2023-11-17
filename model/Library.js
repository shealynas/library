export default class Library {
  constructor(handleBooksChanged) {
    this.books = [];
    this.handleBooksChanged = handleBooksChanged;
  }

  getAllBooks() {
    return this.books;
  }

  addBook(book) {
    this.books.push(book);
    this.handleBooksChanged();
  }

  removeBook(title, author, pages) {
    const bookIndex = this.books.findIndex(
      (book) =>
        book.title === title && book.author === author && book.pages === pages
    );

    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
      this.handleBooksChanged();
    }
  }

  getReadBookCount() {
    return this.books.filter((book) => book.read).length;
  }

  getBookCount() {
    return this.books.length;
  }

  getUnreadBookCount() {
    return this.getBookCount() - this.getReadBookCount();
  }
}
