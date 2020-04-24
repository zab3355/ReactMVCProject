const handleRecipe = (e) =>{
  e.preventDefault();
  
  $("#recipeMessage").animate({width: 'hide'}, 350);
  
  if($("#recipeName").val() == '' || $("#recipeAge").val() == ''){
    handleError("All fields are required!");
    return false;
  }
  
  sendAjax('POST', $("#recipeForm").attr("action"), $("#recipeForm").serialize(), function(){
    
    //get csrf token to send to new Recipe
    const csrf = document.querySelector('#recipeForm').querySelector('#csrfToken').value;
    
    loadRecipesFromServer(csrf);
  });
  
  return false;
};

const RecipeForm = (props) =>{
  return(
  <form id="recipeForm" name="recipeForm"
        onSubmit={handleRecipe}
        action="/addRecipe"
        method='POST'
        className="recipeForm"
    >
    <label htmlFor="name">Name: </label>
    <input id="recipeName" type="text" name="name" placeholder="Recipe Name" />
    <label htmlFor="age">Age: </label>
    <input id="recipeAge" type="text" name="age" placeholder="Recipe Age" />
    <input id="csrfToken" type="hidden" name="_csrf" value={props.csrf} />
    <input className="makeRecipeSubmit" type="submit" value="Add Recipe" />
  </form>
  );
};

const RecipeList = function(props){
  if(props.recipes.length === 0){
    return(
      <div className="recipeList">
        <h3 className="emptyRecipe">No Recipes Listed!</h3>
      </div>
    );
  }
  
  const recipeNodes = props.recipes.map(function(recipe){
    return(
      <div key={recipe._id} className="recipe">
        <img src="/assets/img/cartIcon.png" alt="recipe cart icon" className="cartIcon" />
        <h3 className="recipeName">Recipe Name: {recipe.name}</h3>
        <h3 className="recipeAge">Category: {recipe.age}</h3>  
      </div>
    );
  });
  
  return(
    <div className="recipeList">
      {recipeNodes}
    </div>
  );
};

const loadRecipesFromServer = (csrf) =>{
  sendAjax('GET', '/getRecipeItems', null, (data) =>{
    ReactDOM.render(
      <RecipeList csrf={csrf} recipes={data.recipes} />,
      document.querySelector("#recipes")
    );
  });
};

const setup = function(csrf){
  ReactDOM.render(
    <RecipeForm csrf={csrf} />,
    document.querySelector("#makeRecipe")
  );
  
  ReactDOM.render(
    <RecipeList csrf={csrf} recipes={[]} />,
    document.querySelector("#recipes")
  );
  
  loadRecipesFromServer(csrf);
};

const getToken = () =>{
  sendAjax('GET', '/getToken', null, (result) =>{
    setup(result.csrfToken);
  });
};

$(document).ready(function(){
  getToken();
});