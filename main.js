// Globals


// Buttons
var addRecipeButton = document.querySelector('#add-recipe-button');
var letsCookButton = document.querySelector('#lets-cook-button');


// Event Listeners
letsCookButton.addEventListener('click', selectFoodType);

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

// Non-Handler Functions
function randomIndex(foodType) {
  return foodType[Math.floor(Math.random() * (foodType.length))]; //for refactor all random fxn
}

function makeMeal() {
  var mealSide = randomIndex(side);
  var mealMain = randomIndex(main);
  var mealDessert = randomIndex(dessert);
  var wholeMeal = {Side: mealSide, Main: mealMain, Dessert: mealDessert};
  console.log(wholeMeal);      // log for code check
  return wholeMeal;
}

function getRandomDish(foodTypeArray) {
  if (foodTypeArray !== "meal") {
    var foodTypeArray = window[foodTypeArray];
    console.log(randomIndex(foodTypeArray));      // log for code check
    return randomIndex(foodTypeArray);
  } else {
    makeMeal();
  }
}

/*
select a radio option
letsCookButton is clicked
event listener hears click and calls pickrecipe function && clear radio function
  pickrecipe function: finds foodtype array to pick from (determined by radio)
  random index applied to foodtype array
  image on right side is hidden
  foodtype is returned to box-right

  clearRadio function: set back to default (page load status)


*/
