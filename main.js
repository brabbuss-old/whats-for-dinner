// Globals
var currentDish = ""

// Buttons
var addRecipeButton = document.querySelector('#add-recipe-button');
var letsCookButton = document.querySelector('#lets-cook-button');


// Event Listeners
letsCookButton.addEventListener('click', displayDish => {
  selectFoodType();
  if (typeof cookpot !== 'undefined') {
    hideCookpot();
  }
  displayDishAndButton();
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

function displayDishAndButton() {
  var boxRight = document.querySelector("#box-right")
  var dishBlock =
   `
    <h5>You should make:</h5>
    <p id="this-dish">${currentDish}!</p>
    `
    boxRight.innerHTML = dishBlock
}

// Non-Handler Functions
function randomIndex(foodType) {
  return foodType[Math.floor(Math.random() * (foodType.length))]; //for refactor all random fxn
}

function getRandomDish(foodTypeArray) {
  if (foodTypeArray !== "meal") {
    var foodTypeArray = window[foodTypeArray];
    // console.log(randomIndex(foodTypeArray));      // log for code check
    return currentDish = randomIndex(foodTypeArray);
  } else {
    makeMeal();
  }
}

function makeMeal() {
  var mealSide = randomIndex(side);
  var mealMain = randomIndex(main);
  var mealDessert = randomIndex(dessert);
  var wholeMeal = {Side: mealSide, Main: mealMain, Dessert: mealDessert};
  console.log(wholeMeal);      // log for code check
  return wholeMeal;
}

/*

styling:
  dish title pushed into small font (see comp)
  dish is pushed into big font (see comp)
  elements placed in wrapper (take argument of side, main, dessert. or meal) that can toggle hidden
    place elements in data model to keep code clean and dry
reset button displayed
  reset unhides cookpot, hides/deletes dishBlock

random meal is displayed interpolated text (see comp)

Future:
-hide button/radio on click replace with 'start again' or something
-

<div id="displayed-dish-block">
  <h5>You should make:</h5>
  <p id="this-dish">${currentDish}</p>
</div>


*/
