//search for recipe
const searchRecipe = () => {

    let recipeName = document.getElementById("searchByTaste").value;
    
    recipeName = recipeName.toLowerCase();
    recipeName = recipeName.trim();
    // grabs recipe class objects
    let recipeNodeObj = document.querySelectorAll(".recipeList");

    let recipeShow = false;

    recipeNodeObj.forEach(recipeList => {
    //if search input matches a name
        let title = recipeList.querySelector("p").innerHTML;
        title = title.toLowerCase();

        if (recipeName == "sweet") {
           if(title.indexOf("sweet") > -1){
            recipeShow = true;
            recipeList.style.display = "block";
           } else {
            recipeList.style.display = "none"; 
           }
        } 
        else if (recipeName == "spicy"){
           if(title.indexOf("spicy") > -1){
            recipeShow = true;
            recipeList.style.display = "block";
           } else {
            recipeList.style.display = "none"; 
           }            
        }
        else if (recipeName == "sour"){
            recipeList.style.display = "block"; 
           
            if(title.indexOf("spicy" ) > -1){
                    recipeShow = true;
                    recipeList.style.display = "block";
           }
           }
        else if (recipeName =="bitter"){
           if(title.indexOf("bitter") > -1){
            recipeShow = true;
            recipeList.style.display = "block";
           } else {
            recipeList.style.display = "none"; 
           }
        }
        else {
            recipeList.style.display = "none";  
        }
        recipeList.style.display = "none"; 
    });
}
  const showRecipe = () => {
      window.location.href="/addRecipe";
  }
