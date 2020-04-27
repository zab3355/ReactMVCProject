//recipe Handler
const handleRecipe = (e) =>{
  e.preventDefault();
  
  //error handling
  $("#errorMessage").animate({
    width: 'toggle'
  }, 350);

  if($("#recipeName").val() == '' || $("#foodCategory").val() == '' || $("#tasteCategory").val() == '' || $("#priceCategory").val() == '' ) {
    handleError("Please fill out each field!");
    return false;
  }
    
  //Ajax call to send Recipe Form
  sendAjaxCall('POST', $("#recipeForm").attr("action"), $("#recipeForm").serialize(), function(){
    
    //get csrf token to send to new Recipe
    const csrf = document.querySelector('#recipeForm').querySelector('#csrfToken').value;
    
    loadRecipesFromServer(csrf);
  });
    
  $('#foodCategory').value = 'start';
  $('#tasteCategory').value = '';
  $('#priceCategory').value = '';

  
  return false;
};

//Recipe input form
const RecipeForm = (props) =>{
  return(
  <form id="recipeForm" name="recipeForm"
        onSubmit={handleRecipe}
        action="/addRecipe"
        method='POST'
        className="recipeForm"
    >
    <input id="recipeName" type="text" name="name" placeholder="Recipe Name" />    
    <select className="select-option" id="foodCategory" name="category">
            <option selected="selected" disabled="disabled" value="start">Category: </option>
            <option value="Chinese Cuisine">Chinese Cuisine</option>
            <option value="American Cuisine">American Cuisine</option>
            <option value="Mexican Cuisine">Mexican Cuisine</option>
            <option value="Indian Cuisine">Indian</option>
            <option value="Indian Cuisine">Indian Cuisine</option>
            <option value="Japanese Cuisine">Japanese Cuisine</option>
            <option value="Italian Cuisine">Italian Cuisine</option>
      </select>
      
    <select className="select-option" id="priceCateogry" name="price">
            <option selected="selected" disabled="disabled" value="start">Price: </option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
      </select>
      
    <select className="select-option" id="tasteCategory" name="taste">
            <option selected="selected" disabled="disabled" value="start">Taste: </option>
            <option value="Sour">Sour</option>
            <option value="Sweet">Sweet</option>
            <option value="Spicy">Spicy</option>
            <option value="Bitter">Bitter</option>
      </select>
      
    <input id="csrfToken" type="hidden" name="_csrf" value={props.csrf} />
    <button className="makeRecipeSubmit" type="submit">Add Recipe</button>
  </form>
  );
};

//If no recipes are listed
const RecipeList = function(props){
  if(props.recipes.length === 0){
    return(
      <div className="recipeList">
        <h3 className="emptyRecipe">No Recipes Listed!</h3>
      </div>
    );
  };
  
//Recipe nodes
const recipeNodes = props.recipes.map(function (recipe){
    return(
      <div className="recipe" key={recipe._id}>
        <img src={"/assets/img/cartIcon.png"} alt="recipe cart icon" className="cartIcon" />
        <h3 className="recipeName"> {recipe.name}</h3> 
        <p className="foodCategory">Category: {recipe.category}</p>
        <p className="tasteCategory">Taste: {recipe.taste}</p>
        <p className="priceCategory">Price: {recipe.price}</p>
        <input className="makeRecipeSubmit" type="submit" id="favorite" value="Favorite" />
      </div>
    );
  });
  
  return(
    <div className="recipeList">
      {recipeNodes}
    </div>
  );
};

//load getRecipeItems
const loadRecipesFromServer = (csrf) =>{
  sendAjaxCall('GET', '/getRecipeItems', null, (data) =>{
    ReactDOM.render(
      <RecipeList csrf={csrf} recipes={data.recipes} />,
      document.querySelector("#recipes")
    );
  });
};

//setup Renders
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


//based upon URL, will setup specific renders
const getToken = () =>{
  sendAjaxCall('GET', '/getToken', null, (result) =>{
        setup(result.csrfToken);
    }
};

$(document).ready(function(){
  getToken();
});