//Search for recipe
const searchRecipe = () => {

    let recipeName = document.getElementById("searchByName").value;
    
    recipeName = recipeName.toLowerCase();
    recipeName = recipeName.trim();
    
    //Gets recipe nodes
    let recipeNodeObj = document.querySelectorAll(".recipe");

    //foreach loop for finding recipe name that was searched within recipe nodes
    
    //made lowercase to match search criteria in case user changed case
    recipeNodeObj.forEach(recipe => {
        let start = recipe.querySelector("h3").innerHTML;
        start = start.toLowerCase();
        
          let recipeNameNode = document.querySelector(".recipe").innerHTML;
          recipeNameNode = recipeNameNode.toLowerCase();
          recipeNameNode = recipeNameNode.split(",");
            //if search input matches a name,
            recipeNameNode.forEach(node => {
                node = node.trim();
                if (recipeNodeObj == recipeName) {
                    recipe.style.display = "block";
                } else if (node == recipeName){
                    recipe.style.display = "block";
                } else if (start == recipeName){
                    recipe.style.display = "block";
                } else {
                    recipe.style.display = "none";  
                } 
            });
        });
    }