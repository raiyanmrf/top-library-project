let myLibrary = [
  {
    id: 1,
    name: "The Hobbit",
    author: "tolkien",
    page: 256,
    read: false,
  },
];
const form = document.querySelector("#add-book");
const toogleBtn = document.querySelector(".toogle-button");
const closeBtn = document.querySelector(".close-btn");
const modal = document.querySelector(".modal");
const ol = document.querySelector("#book-list");

document.addEventListener("DOMContentLoaded", handleInitialBookListLoad);
form.addEventListener("submit", handleFormSubmission);
toogleBtn.addEventListener("click", handleToggle);
closeBtn.addEventListener("click", handleToggle);
ol.addEventListener("click", handleListAction);

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

function addBookToLibrary(obj) {
  // take params, create a book then store it in the array

  const { id, name, author, page, read } = obj;
  const book = new Book(id, name, author, page, read);
  myLibrary.push(book);
}

function handleInitialBookListLoad(e) {
  appendToBookList(myLibrary[0]);
}
function handleFormSubmission(e) {
  // console.log(e);
  e.preventDefault();

  const formData = new FormData(form);

  // for (const [key, value] of formData.entries()) {
  //   console.log(key, value);
  // }
  const id = crypto.randomUUID();
  const name = formData.get("name");
  const author = formData.get("author");
  const page = formData.get("page") ?? null;
  const read = formData.get("read") ? true : false;

  const obj = {
    id,
    name,
    author,
    page,
    read,
  };
  // store in the array
  addBookToLibrary(obj);

  // display to book list
  // refresh the list
  loadBookList();

  // hide form
  handleToggle();

  // console.log(myLibrary);
}

function handleToggle() {
  modal.classList.toggle("hide");
}

// toogle modal

function appendToBookList(book) {
  // console.log(book);
  const { id, name, author, page, read } = book;
  const html = `<li id="${id}" class="${read ? "read" : ""}">
                    <strong class="name">${name}</strong>
                    <span class="author">${name}</span>
                    <small class="page">${page ? page + " p" : ""}</small>
                    <label  for="mark-${id}"><input ${read ? "checked" : ""}  type="checkbox" name="mark-${id}" id="mark-${id}"> Mark as Read
                    </label>
                    <button class="delete">Delete</button>
                </li>`;

  ol.innerHTML += html;
}

function loadBookList() {
  ol.innerHTML = "";

  for (const obj of myLibrary) {
    appendToBookList(obj);
  }
}

function handleListAction(e) {
  const target = e.target;
  const tagName = target.tagName;
  // console.log(target.tagName);

  if (tagName === "INPUT") {
    // checkbox > label > li
    const li = target.parentElement.parentElement;

    // remove from array
    const updateArray = myLibrary.map((obj) => {
      if (String(obj.id) == String(li.id)) {
        obj.read == true ? (obj.read = false) : (obj.read = true);
      }
      return obj;
    });

    // avoid mutation
    myLibrary = updateArray;
    // console.log(myLibrary);
    // return;
  }
  if (tagName === "BUTTON") {
    // button > li
    const li = target.parentElement;

    // remove from the array
    const updateArray = myLibrary.filter(
      (obj) => String(obj.id) != String(li.id),
    );

    // avoid mutation
    myLibrary = updateArray;
    // console.log(myLibrary);
    // return;
  }

  // refresh the list
  loadBookList();
}
