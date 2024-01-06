
const imageUpload = document.getElementById('imageUpload');
const displayDiv = document.getElementById('displayDiv');
const DisplayAdd = document.querySelector('.Details');




function toggleAdd() {
    DisplayAdd.classList.toggle('Details-diplay');
}


const Getinfo = document.querySelector('#getinfo');
const LibraryBooks = document.querySelector('.library-books');


function bookInfoDetails(title , author, genre, pages, currentPage,  Status){
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.currentPage = currentPage;
    this.Status = Status;
    
}

function newBook(){

    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let genre = document.querySelector('#genre').value;
    let pages = document.querySelector('#pages').value;
    let currentPage = document.querySelector('#currentPage').value;
    let status = document.querySelector('#status').value;

   

    let cardDiv = document.createElement('div');
      cardDiv.classList.add('card');

      let cardImgDiv = document.createElement('div');
      cardImgDiv.classList.add('card-image');
      cardDiv.appendChild(cardImgDiv);
     

      let cardInfoDiv = document.createElement('div');
      cardInfoDiv.classList.add('card-info');
      cardDiv.appendChild(cardInfoDiv);
      cardInfoDiv.innerHTML =  `
      <h2 class="card-title">${title}</h2>
      <h3 class="card-author">${author}</h3>
      <p class="card-details">Number of Pages: ${pages}</p>
      <p class="card-details">Current Page: ${currentPage}</p>
      <p class="card-details">Reading Status: ${status}</p>`
      

      LibraryBooks.appendChild(cardDiv); // Append the div to the container

      const Style = window.getComputedStyle(displayDiv);
        let bgImageUrl = Style.backgroundImage.slice(4, -1).replace(/"/g, "");  // Extract the URL
        console.log('Image URL: ' + bgImageUrl);

        cardImgDiv.style.backgroundImage = `url(${bgImageUrl})`; 
}


Getinfo.addEventListener('click', function(event) {
    event.preventDefault(); // This should prevent the form from submitting and the page from reloading

    let formIsValid = true;

    this.querySelectorAll('[required]').forEach(function(input) {
      if (!input.value.trim()) {
        // If a required field is empty, mark the form as invalid
        console.error(input.name + ' is required');
        formIsValid = false;
      }
    });

    if (formIsValid) {
       
        
      newBook();
        
      toggleAdd()
    }
});







imageUpload.addEventListener('change', event => {
 const image = event.target.files[0];
 const reader = new FileReader();

 reader.addEventListener('load', () => {
   localStorage.setItem('image', reader.result);
   displayDiv.style.backgroundImage = `url(${reader.result})`;
 });

 if (image) {
   reader.readAsDataURL(image);
 }
});
