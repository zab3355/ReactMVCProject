const handleRecipe = (e) =>{
  e.preventDefault();
  
  $("#errrorMessage").animate({width: 'hide'}, 350);
  
  if($("#recipeName").val() == '' || $("#foodCategory").val() == '' || $("#tasteCategory").val() == '' || $("#priceCategory").val() == '' ) {
    handleError("All fields are required!");
    return false;
  }
  
  sendAjaxCall('POST', $("#recipeForm").attr("action"), $("#recipeForm").serialize(), function(){
    
    //get csrf token to send to new Recipe
    const csrf = document.querySelector('#recipeForm').querySelector('#csrfToken').value;
    
    loadRecipesFromServer(csrf);
  });
    
  $('#tasteCategory').value = '';
  $('#priceCategory').value = '';
  $('#foodCategory').value = 'start';
  
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
    <input id="recipeName" type="text" name="name" placeholder="Recipe Name" />    
    <select className="select-option" id="foodCategory" name="category">
            <option selected="selected" disabled="disabled" value="start">Category: </option>
            <option value="Chinese Cuisine">Chinese Cuisine</option>
            <option value="American Cuisine">American Cuisine</option>
            <option value="Mexican Cuisine">Mexican Cuisine</option>
            <option value="Indian Cuisine">Indian</option>
            <option value="Indian">Indian Cuisine</option>
            <option value="Japanese Cuisine">Japanese Cuisine</option>
            <option value="Italian">Italian Cuisine</option>
      </select>
      
    <select className="select-option" id="priceCateogry" name="price">
            <option selected="selected" disabled="disabled" value="start">Price: </option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
      </select>
      
    <select className="select-option" id="tasteCategory" name="taste">
            <option selected="selected" disabled="disabled" value="start">Price: </option>
            <option value="Sour">Sour</option>
            <option value="Sweet">Sweet</option>
            <option value="Spicy">Spicy</option>
            <option value="Bitter">Bitter</option>
      </select>
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
  };
  
  const recipeNodes = props.recipes.map(function(recipe){
    return(
  <form id="recipeForm" name="recipeForm"
        onSubmit={handleRecipe}
        action="/information"
        method='POST'
        className="recipeForm"
    >
      <div key={recipe._id} className="recipe">
       <div className="recipeNode" id="recipeNodeShow" onclick="showRecipe()">
        <img src="/assets/img/cartIcon.png" alt="recipe cart icon" className="cartIcon" />
        <h3 className="recipeName">Recipe Name: {recipe.name}</h3> 
        <p className="foodCategory">Category: {recipe.category}</p>
        <p className="tasteCategory">Taste: {recipe.taste}</p>
        <p className="priceCategory">Price: {recipe.price}</p>
        <input className="makeRecipeSubmit" type="submit" value="Information" />
      </div>
    </div>
    </form>
    );
  });
  
  return(
    <div className="recipeList">
      {recipeNodes}
    </div>
  );
};

const loadRecipesFromServer = (csrf) =>{
  sendAjaxCall('GET', '/getRecipeItems', null, (data) =>{
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

const getToken = (url) =>{
  sendAjaxCall('GET', '/getToken', null, (result) =>{
    
    if(window.location.href.indexOf("maker") > -1){
        setup(result.csrfToken);
    }
    if(window.location.href.indexOf("account") > -1) {
        setupPassChangeForm(result.csrfToken);
        } 
    });
};

$(document).ready(function(){
  getToken();
});