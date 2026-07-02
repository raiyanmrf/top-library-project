const myLibrary = [];
const form = document.querySelector("#add-book");
const toogleBtn = document.querySelector(".toogle-button");
const closeBtn = document.querySelector(".close-btn");
const modal = document.querySelector(".modal");

form.addEventListener("submit", handleFormSubmission);
toogleBtn.addEventListener("click", handleToggle);
closeBtn.addEventListener("click", handleToggle);

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

function handleFormSubmission(e) {
  console.log(e);
  e.preventDefault();

  const formData = new FormData(form);

  // for (const [key, value] of formData.entries()) {
  //   console.log(key, value);
  // }
  const name = formData.get("name");
  const author = formData.get("author");
  const page = formData.get("page") ?? null;
  const read = formData.get("read") ? true : false;

  addBookToLibrary(name, author, page, read);

  // console.log(myLibrary);
}

function handleToggle(e) {
  e.stopPropagation();
  modal.classList.toggle("hide");
}

// toogle modal
