function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav"; 
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const closeBtn = document.querySelector('.close');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));



// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// ================== TODO : fermer la modale #1 ======================

// close modal event
closeBtn.addEventListener('click', closeModal);
// close modal form
function closeModal(){
  modalbg.style.removeProperty('display');
}

// ================== Implémenter entrées du formulaire #2 ============


