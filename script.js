const myLibrary = [];

function Book(id, name, author, page, read) {
  // the constructor...

  if (!new.target) {
    throw Error("Invalid calling of this function.");
  }

  this.id = id;
  this.name = name;
  this.author = author;
  this.page = page;
  this.read = read;
}

function addBookToLibrary(name, author, page = null, read = false) {
  // take params, create a book then store it in the array
  const id = crypto.randomUUID();
  const book = new Book(id, name, author, page, read);
  myLibrary.push(book);
}
