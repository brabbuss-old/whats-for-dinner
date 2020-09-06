// Globals
var currentDish = ""

// Buttons
var addRecipeButton = document.querySelector('#add-recipe-button');
var letsCookButton = document.querySelector('#lets-cook-button');
var clearButton = document.querySelector('#clear-button');
var addNewButton = document.querySelector('#add-new-button');
var radioSelection;

// Event Listeners
letsCookButton.addEventListener('click', letsCookDisplayContentRightBox => {
  selectFoodType();
  if (radioSelection !== false) {
    displayDish();
    unhideClearButton();
  }
});

clearButton.addEventListener('click', clearContentRightBox => {
  unDisplayDish();
  unhideCookpot();
});

addRecipeButton.addEventListener('click', unHideAddRecipeBar => {
  showAddRecipeBar();
});

addNewButton.addEventListener('click', addNewRecipe => {
  saveNewRecipeData();
});


// Event Handlers
function selectFoodType() {
  // var radioSelection;         // why doesn't this work and become global?
  let radioButtons = document.querySelectorAll('input[name="food-type"]');
  let foodType;

  for (const aRadioButton of radioButtons) {
    if (aRadioButton.checked) {
      foodType = aRadioButton.value;
      hideCookpot();
      getRandomDish(foodType);
      radioSelection = true;
      break
    } else {
      radioSelection = false
    }
  }
  event.preventDefault();
};

function hideCookpot() {
  let cookpot = document.querySelector("#cookpot");
  cookpot.classList.add("hidden")
}

function unhideCookpot() {
  let cookpot = document.querySelector("#cookpot");
  cookpot.classList.remove("hidden");
}

function displayDish() {
  let boxRight = document.querySelector("#display-dish-section");
  let dishBlock =
   `
    <h5>You should make:</h5><br>
    <p id="this-dish">${currentDish}</p><br>
    `
    boxRight.innerHTML = dishBlock;
    // boxRight.insertAdjacentHTML("afterbegin", dishBlock);

  let thisDish = document.querySelector("#this-dish");

  if (currentDish.length > 45) {
    thisDish.classList.add("meal")
  } else {
    thisDish.classList.remove("meal");          //for font size adjustment for longer meal string
    thisDish.classList.add("dish")
  }
}

function unDisplayDish() {
  var element = document.getElementById("display-dish-section");
  while (element.firstChild) {                // like a dynamically updated real-time for loop
    element.removeChild(element.firstChild);
  }
  radioClear();
  hideClearButton();
}

function unhideClearButton() {
  clearButton.classList.remove("hidden")
}

function hideClearButton() {
  clearButton.classList.add("hidden")
}

function showAddRecipeBar() {
  let recipeBar = document.querySelector("#recipe-bar");
  let form = document.querySelector("#recipe-form");
  recipeBar.classList.remove("hidden");
  form.classList.remove("hidden");
}



//
// function clearFields() {
//   userTitleInput.value = ''
//   userCoverInput.value = ''
//   userDescriptor1Input.value = ''
//   userDescriptor2Input.value = ''
// }

function saveNewRecipeData() {
  let recipeType = document.querySelector("#add-recipe-type-input").value;
  let recipeName = document.querySelector("#add-recipe-name-input").value;

  recipeType.toLowerCase();  // lowcase to access data array

  let recipeTypeJS = window[recipeType.toLowerCase().split(" ")[0]];  //converts from string

  recipeTypeJS.push(recipeName)

  event.preventDefault();
}

// Non-Handler Functions
function randomIndex(foodType) {
  return foodType[Math.floor(Math.random() * (foodType.length))]; //for refactor all random fxn
}

function getRandomDish(foodTypeArray) {
  if (foodTypeArray !== "meal") {
    var foodTypeArray = window[foodTypeArray];
    return currentDish = randomIndex(foodTypeArray);
  } else {
    makeMeal();
  }
}

function makeMeal() {
  var mealSide = randomIndex(side);
  var mealMain = randomIndex(main);
  var mealDessert = randomIndex(dessert);
  var wholeMeal = {Side: mealSide, Main: mealMain, Dessert: mealDessert};   //  just in case
  console.log(wholeMeal);      // log for code check
  return currentDish = `${mealMain} with a side of ${mealSide} and ${mealDessert} for dessert!`
}

function radioClear() {
  let radioButtons = document.getElementsByName('food-type');
  for (const aRadioButton of radioButtons) {
    aRadioButton.checked = false;
  }
}


/*
display new food with new recipe?
dont add dupes?
upper case first letter(s)?
*/
