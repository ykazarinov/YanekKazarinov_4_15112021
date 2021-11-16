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


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));



// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  
 
}

// ================== TODO : fermer la modale #1 ======================

const closeBtn = document.querySelector('.close');
// close modal event
closeBtn.addEventListener('click', closeModal);
// close modal form
function closeModal(){
  modalbg.style.removeProperty('display');
}

// ================== Implémenter entrées du formulaire #2 ============
class field{
  constructor(fieldName, regExp, errorText, error){
    this.fieldName = fieldName;
    this.regExp = regExp;
    this.errorText = errorText;
    this.error = error;
  }
}

let fieldsArr = [];

fieldsArr[0] = new field('first', /[a-z,A-Z]{2,}$/, 'Au moins 2 lettres', true);
fieldsArr[1] = new field('last', /[a-z,A-Z]{2,}$/, 'Au moins 2 lettres', true);
fieldsArr[3] = new field('email', /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u, 'Veuillez entrer un email valide', true);
fieldsArr[4] = new field('quantity', /[0-9]$/, 'Entrez le numéro', true);
fieldsArr[5] = new field('checkbox1', /[a-z]/, 'Champs requis', true);
fieldsArr[6] = new field('location', /[a-z]/, 'Sélectionnez une ville', true);

// delete all errorMessages
function deleteErrorMessages(){
    var errorElements = document.getElementsByClassName('error');
    while(errorElements[0]) {
        errorElements[0].parentNode.removeChild(errorElements[0]);
    }
}

// verification for radio
function isAnyRadioChecked(){
  return document.querySelectorAll('input[type="radio"]:checked').length;
}

// create div with red error
function createDivWithError(elem, errorText){
  var newDiv = document.createElement("div");
  newDiv.classList.add('error');
  newDiv.innerHTML = errorText;
  elem.parentElement.insertBefore(newDiv, elem.nextSibling);
}

// vérification du contenu du champ
function isValid(field){
  let elem = document.querySelector('input[name="'+ field.fieldName +'"]');
  if(!field.regExp.test(elem.value)  // for 'normal' inputs
      || (field.fieldName === 'checkbox1' && !elem.checked)   // for checkbox
      || (field.fieldName === 'location' && isAnyRadioChecked() === 0)   // for radioboxes
      ){
    field.error = true;
    createDivWithError(elem, field.errorText);
  }
  else{
    field.error = false;
  }
}

// vérification de chaque champ lors de la défocalisation
fieldsArr.forEach(i => {
  document.querySelector('input[name="'+ i.fieldName +'"]').addEventListener('change', function(e){
    deleteErrorMessages();
    isValid(i);
  });
});


//  submit form
document.querySelector('form').addEventListener('submit', function(e){
  e.preventDefault();
  deleteErrorMessages();

  let isError;

  fieldsArr.forEach(i => {
    isValid(i);
    if(i.error === true){
      isError = true;
    }
  });

  if(isError){
    alert('Remplissez les champs obligatoires et corrigez les erreurs');
  }else{
    this.submit();
  }
  
})




