// Globals
var recipeType = document.querySelector("#add-recipe-type-input");
var recipeName = document.querySelector("#add-recipe-name-input");
var radioSelection;
var searchTerm = "";
var currentDish = ""
var wholeMeal = {}

// Buttons
var addRecipeButton = document.querySelector('#add-recipe-button');
var letsCookButton = document.querySelector('#lets-cook-button');
var clearButton = document.querySelector('#clear-button');
var addNewButton = document.querySelector('#add-new-button');
var findRecipesButton = document.querySelector('#find-recipes-button');
var closeRecipeBarButton = document.querySelector('#close-button-block');
var radioButtons = document.querySelectorAll('input[name="food-type"]');
var mealSideButton = document.querySelector("#meal-side-name");
var mealMainButton = document.querySelector("#meal-main-name");
var mealDessertButton = document.querySelector("#meal-dessert-name");

// Event Listeners

letsCookButton.addEventListener('click', letsCookDisplayContentRightBox => {
  selectFoodType();
  if (radioSelection !== false && radioSelection !== "meal") {
    displayDish();
    unhideClearButton();
    unhideFindRecipesButton();
  } else if (radioSelection === "meal") {
    displayDish();
    unhideClearButton();
    hideFindRecipesButton();
  }
});

clearButton.addEventListener('click', clearContentRightBox => {
  unDisplayDish();
  unhideCookpot();
  hideMealButtons();
});

addRecipeButton.addEventListener('click', unHideAddRecipeBarHideButton => {
  addRecipeButton.classList.add("hidden");
  showAddRecipeBar();
  setTimeout(() => {closeRecipeBarButton.classList.add("get-big")} , 700);
});

addNewButton.addEventListener('click', addNewRecipe => {
  saveNewRecipeData();
});

findRecipesButton.addEventListener('click', findRecipes => {
  findMeRecipes();
})

closeRecipeBarButton.addEventListener('click', closeAddRecipeSection => {
  closeRecipeBarButton.classList.remove("get-big");
  setTimeout(() => {closeRecipeBar()}, 150)
})

mealSideButton.addEventListener('click', mealRecipe => {
  searchMealRecipes("side")
});
mealMainButton.addEventListener('click', mealRecipe => {
  searchMealRecipes("main")
});
mealDessertButton.addEventListener('click', mealRecipe => {
  searchMealRecipes("dessert")
});

// Direct Event Handlers

function selectFoodType() {
  let foodType;
  for (const aRadioButton of radioButtons) {
    if (aRadioButton.checked) {
      foodType = aRadioButton.value;
      getRandomDish(foodType);
      radioSelection = foodType;
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
  hideCookpot();
  let boxRight = document.querySelector("#display-dish-section");
  let dishBlock =
   `
    <h5>You should make:</h5><br>
    <p id="this-dish">${currentDish}</p><br>
    `
    boxRight.innerHTML = dishBlock;

  let thisDish = document.querySelector("#this-dish");

  if (currentDish.length > 45) {
    thisDish.classList.add("meal");
    unhideMealButtons();
  } else {
    thisDish.classList.remove("meal");   //for font size adjustment for longer meal string
    thisDish.classList.add("dish");
    hideMealButtons();
  }
}

function unDisplayDish() {
  var element = document.getElementById("display-dish-section");
  radioClear();
  hideClearButton();
  hideFindRecipesButton();
}

function unhideClearButton() {
  clearButton.classList.remove("hidden")
}

function hideClearButton() {
  clearButton.classList.add("hidden")
}

function unhideFindRecipesButton() {
  findRecipesButton.classList.remove("hidden")
}

function hideFindRecipesButton() {
  findRecipesButton.classList.add("hidden")
}

function unhideMealButtons() {
  document.querySelector("#meal-buttons-section").classList.remove("hidden")
}

function hideMealButtons() {
  document.querySelector("#meal-buttons-section").classList.add("hidden")
}

function showAddRecipeBar() {
  let recipeBar = document.querySelector("#recipe-bar");
  let form = document.querySelector("#recipe-form");
  recipeBar.classList.remove("hidden");
  closeRecipeBarButton.classList.remove("hidden");
  form.classList.remove("hidden");
  // form.classList.add("slider");
}

function closeRecipeBar() {
  let recipeBar = document.querySelector("#recipe-bar");
  let form = document.querySelector("#recipe-form");
  recipeBar.classList.add("hidden");
  closeRecipeBarButton.classList.add("hidden");
  form.classList.add("hidden");
  addRecipeButton.classList.remove("hidden");
}

function checkIfDuplicate() {
  let recipeTypeJS = window[recipeType.value.toLowerCase().split(" ")[0]];  //converts from string to usable JS
  let splitString = recipeName.value.toLowerCase().split(' ');
  for (var i = 0; i < splitString.length; i++) {
    splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1);
  }
  var recipeNameUpcase = splitString.join(' ');

  if (recipeTypeJS.includes(recipeNameUpcase) === false) {
    recipeTypeJS.push(recipeNameUpcase)
  }

  currentDish = recipeNameUpcase;
}

function saveNewRecipeData() {
  if (recipeType.value !== "call-to-action" && recipeName.value !== "") {
    // let recipeTypeJS = window[recipeType.value.toLowerCase().split(" ")[0]];  //converts from string to usable JS
    inputNoLongerRequired();  // clears CTA of empty fields
    checkIfDuplicate();
    displayCustomRecipe();
    inputClearFields();
    event.preventDefault();
  } else {
    inputRequired();
    event.preventDefault();
  }
}

function findMeRecipes() {
  window.open(`https://www.allrecipes.com/search/?sitesearch=&wt=${currentDish}`)
}

function searchMealRecipes(type) {
  if (type === "side") {
    console.log(searchTerm);
    searchTerm = wholeMeal.side
  } else if (type === "main") {
    searchTerm = wholeMeal.main
  } else {
    searchTerm = wholeMeal.dessert
  }
  console.log(searchTerm);
  window.open(`https://www.allrecipes.com/search/?sitesearch=&wt=${searchTerm}`)
}

// Additional Functions

function loadingAnimation() {
  loading.classList.remove("hidden");
  setTimeout(function() {loading.classList.add("hidden")}, 5000);
}

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
  wholeMeal = {side: mealSide, main: mealMain, dessert: mealDessert};   //  just in case
  mealSideButton.innerText = `${wholeMeal.side}`;
  mealMainButton.innerText = `${wholeMeal.main}`;
  mealDessertButton.innerText = `${wholeMeal.dessert}`;
  console.log(wholeMeal);      // log for code check
  return currentDish = `${mealMain} with a side of ${mealSide} and ${mealDessert} for dessert!`
}

function radioClear() {
  let radioButtons = document.getElementsByName('food-type');
  for (const aRadioButton of radioButtons) {
    aRadioButton.checked = false;
  }
}

function inputClearFields() {
  recipeType.value = "call-to-action"
  recipeName.value = ""
  for (const aRadioButton of radioButtons) {
    aRadioButton.checked = false;
  }
}

function inputRequired() {
recipeType.classList.add("input-required");
recipeName.classList.add("input-required", "input-required::placeholder");
}

function inputNoLongerRequired() {
recipeName.classList.remove("input-required", "input-required::placeholder");
recipeType.classList.remove("input-required");
}

function displayCustomRecipe() {

  unhideClearButton();
  unhideFindRecipesButton();
  console.log(currentDish);
  displayDish();
}
