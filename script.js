const myLibrary = [];
const form = document.querySelector("#add-book");
const toogleBtn = document.querySelector(".toogle-button");
const closeBtn = document.querySelector(".close-btn");
const modal = document.querySelector(".modal");
const ol = document.querySelector("#book-list");

form.addEventListener("submit", handleFormSubmission);
toogleBtn.addEventListener("click", handleToggle);
closeBtn.addEventListener("click", handleToggle);

ol.addEventListener("click", handleReadStatus);

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

function addBookToLibrary(id, name, author, page = null, read = false) {
  // take params, create a book then store it in the array

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
  const id = crypto.randomUUID();
  const name = formData.get("name");
  const author = formData.get("author");
  const page = formData.get("page") ?? null;
  const read = formData.get("read") ? true : false;

  // store in the array
  addBookToLibrary(id, name, author, page, read);

  // display to book list
  appendToBookList(id, name, author, page, read);

  // hide form
  handleToggle();

  // addEventsToCheckBox(id);

  // addEventsToDeleteBtn(id);

  // console.log(myLibrary);
}

function handleToggle() {
  modal.classList.toggle("hide");
}

// toogle modal

function appendToBookList(id, name, author, page, read) {
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

function handleReadStatus(e) {
  const target = e.target;
  console.log(target.tagName);
  const li = target.parentElement.parentElement;

  if (target.tagName === "INPUT") li.classList.toggle("read");
  else li.remove();
}

// function addEventsToCheckBox(id) {
//   const checkbox = document.getElementById("mark-" + id);

//   checkbox.addEventListener("change", () => {
//     handleReadStatus(id);
//   });
// }
// function addEventsToDeleteBtn(id) {
//   const li = document.getElementById(id);

//   const btn = li.lastElementChild;

//   console.log(btn);

//   btn.addEventListener("click", (li) => {
//     li.remove();
//   });
// }
