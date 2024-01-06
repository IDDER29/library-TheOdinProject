function add() {
    const DisplayAdd = document.querySelector('.Details'); 
    DisplayAdd.classList.remove('Details-diplay');
}




const imageUpload = document.getElementById('imageUpload');
const displayDiv = document.getElementById('displayDiv');

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
