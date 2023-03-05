const form = document.querySelector("form");
const title = form.querySelector("input[name=title]");
const author = form.querySelector("input[name=author]");
const isbn = form.querySelector("input[name=isbn]");
const btn = form.querySelector("input[type=submit]");
const bookList = document.querySelector(".book-list");
const addingRemoveWarning = document.querySelector(".adding-remove-warning");
form.addEventListener("submit", submitForm);
function submitForm(eve) {
  eve.preventDefault();
  creatingBook();
  title.value = "";
  author.value = "";
  isbn.value = "";
}
function creatingBook() {
  const bookInfo = [title.value, author.value, isbn.value];
  let tableRow = document.createElement("tr");
  let text = "";
  tableRow.appendChild(document.createTextNode(text));
  bookList.appendChild(tableRow);
  tableRow.innerHTML = `
    <td>${bookInfo[0]}</td>
    <td>${bookInfo[1]}</td>
    <td>${bookInfo[2]}</td>
    <td><a href ="#" class = "delete" >X</a></td>  
  `;
  let allATag = document.querySelectorAll(".delete");
  addingRemoveWarningMessage("Added Successfully !", "adding");
  removeBookFromTable(allATag);
  // let bookListArr = localStorage.getItem("bookListArr")
  //   ? JSON.parse(localStorage.getItem("bookListArr"))
  //   : [];
  // bookListArr.push(bookInfo);
  // localStorage.setItem("bookListArr", JSON.stringify(bookListArr));
  let bookListArr = localStorage.getItem("bookListArr");
  if (bookListArr === null) {
    bookListArr = [];
  } else {
    bookListArr = JSON.parse(localStorage.getItem("bookListArr"));
  }
  bookListArr.push(bookInfo);
  localStorage.setItem("bookListArr", JSON.stringify(bookListArr));
}
// Adding Remove Warning
function addingRemoveWarningMessage(text, message) {
  addingRemoveWarning.innerHTML = text;
  addingRemoveWarning.classList.add(message);
  setTimeout(() => {
    addingRemoveWarning.innerHTML = "";
    addingRemoveWarning.classList.remove(message);
  }, 1000);
}
// Warning Message =======

btn.addEventListener("click", () => {
  if (title.value === "" || author.value === "" || isbn.value === "") {
    addingRemoveWarningMessage("Please Field Your Input !", "warning");
  }
});

// remove book from table ==========
function removeBookFromTable(allATag) {
  allATag.forEach((item) => {
    item.addEventListener("click", (eve) => {
      eve.target.parentElement.parentElement.remove();
      addingRemoveWarningMessage("Removed Successfully !", "remove");
      let itemIsbn =
        eve.target.parentElement.parentElement.children[2].textContent;
      let arr = JSON.parse(localStorage.getItem("bookListArr"));
      const arr2 = arr.filter((item) => {
        return item[2] !== itemIsbn;
      });
      localStorage.setItem("bookListArr", JSON.stringify(arr2));
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  let localSD = JSON.parse(localStorage.getItem("bookListArr"));
  for (const iterator of localSD) {
    let tableRow = document.createElement("tr");
    let text = "";
    tableRow.appendChild(document.createTextNode(text));
    bookList.appendChild(tableRow);
    tableRow.innerHTML = `
    <td>${iterator[0]}</td>
    <td>${iterator[1]}</td>
    <td>${iterator[2]}</td>
    <td><a href ="#" class = "delete" >X</a></td>
  `;
  }
  let allATag = document.querySelectorAll(".delete");
  removeBookFromTable(allATag);
});
