// Globals
// Buttons
var addRecipeButton = document.querySelector('#add-recipe-button');
var letsCookButton = document.querySelector('#lets-cook-button');


// Event Listeners
letsCookButton.addEventListener('click', getRandomDishFromFoodType);

// Event Handlers
function getRandomDishFromFoodType() {
  var radioButtons = document.querySelectorAll('input[name="food-type"]');
  let selectedValue;
  for (const aRadioButton of radioButtons) {
      if (aRadioButton.checked) {
          selectedValue = aRadioButton.value;
          break;
      }
  }
  alert(selectedValue.toString());
  return selectedValue
};


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
