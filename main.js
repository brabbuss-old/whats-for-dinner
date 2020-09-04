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
  getRandomDish(window[foodType]);
  event.preventDefault();
};

// Non-Handler Functions
function getRandomDish(foodTypeArray) {
  console.log(foodTypeArray[Math.floor(Math.random() * (foodTypeArray.length))]);
  return foodTypeArray[Math.floor(Math.random() * (foodTypeArray.length))];    // how to include 0
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
