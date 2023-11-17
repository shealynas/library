import Book from "./model/Book.js";
import Library from "./model/Library.js";

const ADD_BOOK_FORM = document.getElementById("add-book-form");
const bookSection = document.querySelector(".books");
const newBookButton = document.getElementById("new-book-btn");
const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("close-modal");

const onLibraryChanged = () => {
  renderBooks();
  updateCounters();
};

const myLibrary = new Library(onLibraryChanged);
let readCounter = 0;
let incompleteCounter = 0;

function addBookToLibrary(event) {
  event.preventDefault();

  const formElements = ADD_BOOK_FORM.elements;

  const bookTitle = formElements["book-title"].value;
  const bookAuthor = formElements["book-author"].value;
  const bookPages = formElements["book-pages"].value;
  const isRead = formElements["is-read-checkbox"].checked;

  const newBook = new Book(bookTitle, bookAuthor, bookPages);
  newBook.read = isRead;

  myLibrary.addBook(newBook);

  ADD_BOOK_FORM.reset();

  modal.style.display = "none";
}

ADD_BOOK_FORM.addEventListener("submit", addBookToLibrary);

function renderBook(title, author, pages, read) {
  const BOOK_CARD = document.createElement("div");
  const BOOK_TITLE = document.createElement("h3");
  const BOOK_AUTHOR = document.createElement("p");
  const BOOK_PAGES = document.createElement("p");
  const READ_LABEL = document.createElement("label");
  const READ_CHECKBOX = document.createElement("input");
  const REMOVE_BUTTON = document.createElement("button");

  REMOVE_BUTTON.classList.add("remove-btn");
  BOOK_CARD.classList.add("book-card");

  BOOK_TITLE.textContent = `Title: ${title}`;
  BOOK_AUTHOR.textContent = `Author: ${author}`;
  BOOK_PAGES.textContent = `# of Pages: ${pages}`;
  READ_LABEL.textContent = "Read:";
  REMOVE_BUTTON.textContent = "Remove";

  READ_CHECKBOX.type = "checkbox";
  READ_CHECKBOX.checked = read;
  READ_CHECKBOX.addEventListener("change", () => {
    myLibrary.getAllBooks().forEach((book) => {
      if (
        book.title === title &&
        book.author === author &&
        book.pages === pages
      ) {
        book.read = READ_CHECKBOX.checked;
        updateCounters();
      }
    });
  });

  REMOVE_BUTTON.addEventListener("click", () => {
    myLibrary.removeBook(title, author, pages);
  });

  READ_LABEL.append(READ_CHECKBOX);
  BOOK_CARD.append(
    BOOK_TITLE,
    BOOK_AUTHOR,
    BOOK_PAGES,
    READ_CHECKBOX,
    READ_LABEL,
    REMOVE_BUTTON
  );

  bookSection.append(BOOK_CARD);
}

function renderBooks() {
  bookSection.innerHTML = "";

  myLibrary.getAllBooks().forEach((book) => {
    renderBook(book.title, book.author, book.pages, book.read);
  });
  updateCounters();
}

newBookButton.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

function updateCounters() {
  readCounter = myLibrary.getReadBookCount();
  incompleteCounter = myLibrary.getUnreadBookCount();

  document.getElementById(
    "read-counter"
  ).textContent = `Books Read: ${readCounter}`;
  document.getElementById(
    "incomplete-counter"
  ).textContent = `Books Incomplete: ${incompleteCounter}`;
}
