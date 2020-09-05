// Globals
var currentDish = ""

// Buttons
var addRecipeButton = document.querySelector('#add-recipe-button');
var letsCookButton = document.querySelector('#lets-cook-button');


// Event Listeners
letsCookButton.addEventListener('click', displayDishRight => {
  selectFoodType();
  if (typeof cookpot !== 'undefined') {
    hideCookpot();
  }
  displayDish();
});

// Event Handlers
function selectFoodType() {
  var radioButtons = document.querySelectorAll('input[name="food-type"]');
  let foodType;
  for (const aRadioButton of radioButtons) {
    if (aRadioButton.checked) {
      foodType = aRadioButton.value;
      break;
    }
  }
  getRandomDish(foodType);
  event.preventDefault();
};

function hideCookpot() {
  var cookpot = document.querySelector("#cookpot");
    cookpot.classList.add("hidden")           // available also classlits.REMOVE***
}

function displayDish() {
  var boxRight = document.querySelector("#box-right");
  var dishBlock =
   `
    <h5>You should make:</h5>
    <p id="this-dish">${currentDish}!</p>
    `
    boxRight.innerHTML = dishBlock;

  var thisDish = document.querySelector("#this-dish");

  if (currentDish.length > 45) {
    thisDish.classList.add("meal")
  } else {
    thisDish.classList.remove("meal");
    thisDish.classList.add("dish")
  }
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

/*
reset button displayed
  insert Button with lets cook click as separate element from dish text
  for button propogation use if not !== similar to cookpot validation
  reset button has .hidden tag on page load
  .classList.remove(".hidden") on lets cookpot
  opposite when clicking clear
click
  unhides cookpot
  hides/deletes dishBlock removeAdjacentHTML
  hides reset button

random meal is displayed interpolated text (see comp)

Future:
-hide button/radio on click replace with 'start again' or something
-

<div id="displayed-dish-block">
  <h5>You should make:</h5>
  <p id="this-dish">${currentDish}</p>
</div>


*/
