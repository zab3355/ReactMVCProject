//Search for recipe
const searchRecipe = () => {

    let recipeName = document.getElementById("searchByName").value;
    
    recipeName = recipeName.toLowerCase();
    recipeName = recipeName.trim();
    
    //Grabs recipe nodes
    let recipeNodeObj = document.querySelectorAll(".recipe");

    recipeNodeObj.forEach(recipe => {

        let start = recipe.querySelector("h3").innerHTML;
        start = start.toLowerCase();
        
          let recipeNameNode = document.querySelector(".recipe").innerHTML;
          recipeNameNode = recipeNameNode.toLowerCase();
          recipeNameNode = recipeNameNode.split(",");
    //if search input matches a name
        recipeNameNode.forEach(item => {
            item = item.trim();
        if (recipeNodeObj == recipeName) {
            recipe.style.display = "block";
           } else if (item == recipeName){
               recipe.style.display = "block";
           } else if (start == recipeName){
               recipe.style.display = "block";
           } else {
            recipe.style.display = "none";  
        } 
    });
});
}
  const showRecipe = () => {
      window.location.href="/addRecipe";
  }