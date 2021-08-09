
// Get the modal
let modal = document.querySelector('#myModal');

// Get the button that opens the modal
let btn = document.querySelector('#myBtn');

// Get the <span> element that closes the modal
let span = document.querySelectorAll('.close')[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  // if (window.screen.width > 768) {
  //   console.log(123);
    modal.style.display = 'block';
  // }
};
window.addEventListener('resize', () => {
  modal.style.display = 'none';
})
window.addEventListener('scroll', () => {
  modal.style.display = 'none';
})
// When the user clicks on <span> (x), close the modal

span.onclick = function () {
    modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

