  const searchRecipe = () => {

        let recipeName = document.getElementById("searchByName").value;

        let makeRecipe = document.getElementById("makeRecipe");
        // grabs all the
        let recipeNodeObj = document.querySelectorAll(".recipes");

        let recipeShow = false;

        //for each card,
        recipeNodeObj.forEach(recipes => {
          //if title matches input, display and show tag
          let title = recipes.querySelector("h3").innerHTML;
          title = title.toLowerCase();
        if (title == recipeName) {
           recipeShow = true;
                console.log(recipeNode);
                recipe.style.display = "block";
                makeRecipe.querySelector("h3").innerHTML = recipeName;
                makeRecipe.style.display = "block";
            } else {
              recipes.style.display = "none";
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
