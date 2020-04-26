//error handler
var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#errorMessage").animate({
    width: 'toggle'
  }, 350);
};

//success handler
var handleSuccess = function handleSuccess(message) {
  $("#success");
  $("#success").animate({
    width: 'toggle'
  }, 350);
};

const searchRecipe = () => {

    let recipeName = document.getElementById("searchByName").value;

    let makeRecipe = document.getElementById("makeRecipe");
    // grabs recipe class objects
    let recipeNodeObj = document.querySelectorAll(".recipes");

    let recipeShow = false;

    recipeNodeObj.forEach(recipes => {
    //if search input matches a name, display and show tag
          let title = recipes.querySelector("h3").innerHTML;
          title = title.toLowerCase();
        if (title == recipeName) {
           recipeShow = true;
                console.log(recipeNode);
                recipe.style.display = "block";
                makeRecipe.querySelector("h3").innerHTML = recipeName;
                makeRecipe.style.display = "block";
            } else {
              recipe.style.display = "none";
            }
        });

        if (recipeShow == false) {
            $('#searchEmpty').modal('show');
          }
      }
  const removeSearch = () => {
      $('#searchEmpty').modal('hide');
      let makeRecipe = document.getElementById("makeRecipe");

      let recipeNodeObj = document.querySelectorAll(".recipe");

        recipeNodeObj.forEach(card => {
          recipeNode.style.display = "block";
          makeRecipe.style.display = "none";
        });
    }
