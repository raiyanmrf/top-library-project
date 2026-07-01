const myLibrary = [];

function Book(name, author, page = null) {
  // the constructor...

  if (!new.target) {
    throw Error("Invalid calling of this function.");
  }

  this.name = name;
  this.author = author;
  this.page = page;
}

function addBookToLibrary(name, author, page = null) {
  // take params, create a book then store it in the array
  const book = new Book(name, author, page);
  myLibrary.push(book);
}
