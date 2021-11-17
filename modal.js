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
  // modalbg.style.display = "block";
  openModal(modalbg);
  
 
}

// ================== Data pour test ==================================
class testData{
  constructor(fieldName, data, type){
    this.fieldName = fieldName;
    this.data = data;
    this.type = type;
  }
}

let testDataArr = [];

testDataArr[0] = new testData('first', 'Yanek', 'normal');
testDataArr[1] = new testData('last', 'Kazarinov', 'normal');
testDataArr[2] = new testData('email', 'kazarinov.yanek@gmail.com', 'normal');
testDataArr[3] = new testData('birthdate', '1982-09-21', 'normal');
testDataArr[4] = new testData('quantity', 1, 'normal');
testDataArr[5] = new testData('location', [true, 2], 'radio');
testDataArr[6] = new testData('checkbox1', true, 'check');

testDataArr.forEach(i => {
  switch (i.type){ 
    case 'normal' : 
      document.querySelector('input[name = "'+ i.fieldName +'"]').value = i.data;
      break;
    case 'radio' : 
      document.querySelector('input[name = "'+ i.fieldName +'"]:nth-of-type('+ i.data[1] +')').checked = i.data[0];
      break;
    case 'check' : 
      document.querySelector('input[name = "'+ i.fieldName +'"]').checked = i.data;
      break;
  }

});


// ================== TODO : fermer la modale #1 ======================

function openModal(elem){
  elem.classList.remove('noDisplay');
  elem.classList.remove('modal_close');
  elem.classList.add('modal_open');
}

function closeModal(elem){
  elem.classList.add('modal_close');
  elem.classList.remove('modal_open');
  // elem.classList.add('noDisplay');
}

document.addEventListener('click',e => {
  
  if(e.target.classList.contains('close')){
      // e.target.parentElement.parentElement.classList.add('modal_close');
      // e.target.parentElement.parentElement.style.removeProperty('display');
      closeModal(e.target.parentElement.parentElement);
  }
  
});

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

fieldsArr[0] = new field('first', /[a-z,A-Z]{2,}$/, 'Veuillez entrer 2 caractères ou plus pour le champ du prenom.', true);
fieldsArr[1] = new field('last', /[a-z,A-Z]{2,}$/, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.', true);
fieldsArr[3] = new field('email', /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u, 'Veuillez entrer un email valide', true);
fieldsArr[4] = new field('quantity', /[0-9]$/, 'Entrez le numéro', true);
fieldsArr[5] = new field('checkbox1', /[a-z]/, 'Vous devez vérifier que vous acceptez les termes et conditions.', true);
fieldsArr[6] = new field('location', /[a-z]/, 'Vous devez choisir une option.', true);
fieldsArr[7] = new field('birthdate', /[0-9]$/, 'Vous devez entrer votre date de naissance.', true);

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
  e.stopPropagation();
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

    closeModal(modalbg);
    openModal(document.querySelector('.success'));
    
    // modalbg.style.removeProperty('display');
    // document.querySelector('.success').style.display = "block";
    // here we can use submit or ajax
    //  this.submit();

  }
  
})

