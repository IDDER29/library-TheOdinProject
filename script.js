// DOM Elements
const imageUpload = document.getElementById("imageUpload");
const displayDiv = document.getElementById("displayDiv");
const DisplayAdd = document.querySelector(".Details");
const Getinfo = document.querySelector("#getinfo");
const LibraryBooks = document.querySelector(".library-books");
let cardDiv = document.createElement("div");
cardDiv.classList.add("card");

// Book Information
function BookInfoDetails(
  title,
  author,
  genre,
  pages,
  currentPage,
  status,
  bgImageUrl
) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.currentPage = currentPage;
  this.status = status;
  this.bgImageUrl = bgImageUrl;
}

let books = [
  {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    genre: "Software Engineering",
    pages: "464",
    currentPage: "Depends on your reading progress",
    status: "not Read Yet",
    bgImageUrl: "./images/cleanCode_cover.jpg",
  },
  {
    title:
      "Head First HTML and CSS: A Learner's Guide to Creating Standards-Based Web Pages",
    author: "Elisabeth Robson and Eric Freeman",
    genre: "Web Development",
    pages: "768",
    currentPage: "Depends on your reading progress",
    status: "in Progress",
    bgImageUrl: "./images/htmlAndCss_cover.jpg",
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    genre: "Programming",
    pages: "472",
    currentPage: "Depends on your reading progress",
    status: "not Read Yet",
    bgImageUrl: "./images/eloquentjavascript_cover.jpg",
  },
];

// Toggle Add Details
function toggleAdd() {
  DisplayAdd.classList.toggle("Details-diplay");
}

// New Book
function newBook() {
  let formElements = document.getElementById("form").elements;
  let { title, author, genre, pages, currentPage, status } = formElements;

  const Style = window.getComputedStyle(displayDiv);
  let bgImageUrl = Style.backgroundImage.slice(4, -1).replace(/"/g, "");

  books[books.length] = new BookInfoDetails(
    title.value,
    author.value,
    genre.value,
    pages.value,
    currentPage.value,
    status.value,
    bgImageUrl
  );

  displaysEachBook(books);
}

function displaysEachBook(...array) {
  console.log(books);
  document.querySelectorAll(".card").forEach((e) => e.remove());

  array.forEach((book) =>
    book.forEach((info, index) => createCard(info, index))
  );
}

// Create Card
function createCard(book, index) {
  console.log(book);

  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  let cardImgDiv = document.createElement("div");
  cardImgDiv.classList.add("card-image");
  cardImgDiv.style.backgroundImage = `url(${book.bgImageUrl})`;

  let cardEditDiv = document.createElement("div");
  cardEditDiv.classList.add("flex-row");
  let cardDeletButton = document.createElement("button");

  cardDeletButton.setAttribute("data-indexD", index);

  let cardReadButton = document.createElement("button");

  cardReadButton.setAttribute("data-indexR", index);

  cardDeletButton.innerHTML = `<i class="bi bi-file-minus" ></i>`;
  cardReadButton.innerHTML = `<i class="bi bi-book-half" " ></i>`;
  cardEditDiv.appendChild(cardDeletButton);
  cardEditDiv.appendChild(cardReadButton);

  cardDiv.appendChild(cardEditDiv);

  cardDiv.appendChild(cardImgDiv);

  let cardInfoDiv = document.createElement("div");
  cardInfoDiv.classList.add("card-info");
  cardInfoDiv.innerHTML = `
  <h2 class="card-title">${book.title}</h2>
  <h3 class="card-author">${book.author}</h3>
  <p class="card-details">Genre: ${book.genre}</p>
  <p class="card-details">Number of Pages: ${book.pages}</p>
  <p class="card-details">Current Page: ${book.currentPage}</p>
  <p class="card-details">Reading Status: ${book.status}</p>`;

  cardDiv.appendChild(cardInfoDiv);

  LibraryBooks.appendChild(cardDiv);
}

// Event Listener for Get Info Button

Getinfo.addEventListener("click", function (event) {
  let form = document.getElementById("form-style-5");
  let inputs = document.querySelectorAll("[required]");
  let allFilled = true;

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].getAttribute("required") !== null) {
      if (inputs[i].value === "") {
        allFilled = false;
        break;
      }
    }
  }

  if (allFilled) {
    newBook();
    toggleAdd();
  } else {
    alert("Please fill in all required inputs before submitting the form.");
  }
});

// Event Listener for Image Upload
imageUpload.addEventListener("change", (event) => {
  const image = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    localStorage.setItem("image", reader.result);
    displayDiv.style.backgroundImage = `url(${reader.result})`;
  });

  if (image) {
    reader.readAsDataURL(image);
  }
});
displaysEachBook(books);

function removeBook(event) {
  // Use the closest method to find the nearest ancestor button with the data-indexd attribute
  const button = event.target.closest("[data-indexd]");

  // If a matching button is found
  if (button) {
    // Retrieve the value of the data-indexd attribute
    // Note: dataset properties are in camelCase, so data-indexd becomes dataIndexd

    let bookIndex = parseInt(button.dataset.indexd, 10); // Parse it to an integer

    // Check if the book at the index position still exists in the books array
    if (bookIndex < books.length) {
      // Remove the element at the index position from the books array
      books.splice(bookIndex, 1);

      // Do something with the updated books array, such as updating the UI or the storage
      displaysEachBook(books);
      console.log("hi");
    }

    console.log(books);
    console.log("hom");
  }
}

function readBook(event) {
  // Use the closest method to find the nearest ancestor button with the data-indexd attribute
  const button = event.target.closest("[data-indexr]");

  // If a matching button is found
  if (button) {
    // Retrieve the value of the data-indexd attribute
    // Note: dataset properties are in camelCase, so data-indexd becomes dataIndexd

    let bookIndex = parseInt(button.dataset.indexr, 10); // Parse it to an integer

    // Check if the book at the index position still exists in the books array
    if ((books[bookIndex].status == 'in Progress') || (books[bookIndex].status == 'not Read Yet') ) {
      // Remove the element at the index position from the books array
      
      books[bookIndex].status = 'completed Reading';
    
    }else{
      books[bookIndex].status = 'in Progress';
    }
    // Do something with the updated books array, such as updating the UI or the storage
    displaysEachBook(books);
    
    
  }
}

document.addEventListener("click", function (event) {
  // Use the closest method to find the nearest ancestor button with the data-indexD attribute
  const DeletButton = event.target.closest("[data-indexd]");
  const ReadButton = event.target.closest("[data-indexr]");

  console.log("buttons : " + DeletButton);
  // If a matching button is found, call removeBook
  if (DeletButton) {
    removeBook(event);
  } else if (ReadButton) {
    readBook(event);
  }
});
