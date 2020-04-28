//search for recipe
const searchRecipe = () => {

    let recipeName = document.getElementById("searchByName").value;
    
    recipeName = recipeName.toLowerCase();
    recipeName = recipeName.trim();
    
    //Grabs recipe nodes
    let recipeNodeObj = document.querySelectorAll(".recipe");

    recipeNodeObj.forEach(recipe => {
    //if search input matches a name
        if (recipeNodeObj == recipeName) {
            recipe.style.display = "block";
           } 
        else if (recipe.contains(recipeName)){         
            recipe.style.display = "block";
           } else {
            recipe.style.display = "none";  
        } 
    });
}
  const showRecipe = () => {
      window.location.href="/addRecipe";
  }