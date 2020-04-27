var handleError = (message) => {
  $("#errorMessage").text(message);
  $("#errorMessage").animate({
    width: 'toggle'
  }, 350);
};

//recipe Handler
const handleRecipe = (e) =>{
  e.preventDefault();
  
  //error handling
  $("#errorMessage").text(message);
  $("#errorMessage").animate({
    width: 'toggle'
  }, 350);

  if($("#recipeName").val() == '' || $("#foodCategory").val() == '' || $("#tasteCategory").val() == '' || $("#priceCategory").val() == '' ) {
    handleError("Please fill out each field!");
    return false;
  }
    
  if($("#searchByTaste").val() ==''){
    handleError('Please fill out search!');
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

// Handling Password Change Form
const handleChangePass = (e) => {
    e.preventDefault();
  $("#errorMessage").animate({width: 'hide'}, 350);
  
    if ($('#oldPass').val() == '' || $('#newPass').val() == '' || $('#newPass2').val() == '') {
      handleError('Please fill out each field!');
      return false;
    }
  
    if ($('#newPass').val() !== $('#newPass2').val()) {
      handleError('Passwords do not match');
      return false;
    }
  
  $("#errorMessage").text(message);
  $("#errorMessage").animate({
    width: 'toggle'
  }, 350);
    
    //Load the success message and change password if there are no errors
    makeAjaxCallback($('#changePassword').attr('action'), $('#changePassword').serialize(), (data) => {
    //success handler
      handleSuccess('Password changed!');
    $("#success").text="Success!";
    $("#success").animate({width: 'hide'}, 350);
    });
  
    return false;
  };


//Password Change Form
  const ChangePassForm = (props) => {
    return (
      <form id="changePassword" name="changePassword" 
      action="/changePassword" method="POST" 
      class="recipeForm" onSubmit={handleChangePass}>
        <input id="oldPass" type="password" name="oldPass" placeholder="Old Password" />
        <input id="newPass" type="password" name="newPass" placeholder="New Password" />
        <input id="newPass2" type="password" name="newPass2" placeholder="Repeat New Password" />
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Change Password" />
    </form>
    )
  };

//Password Change Form Setup
const setupPassChangeForm = function(csrf) {
    ReactDOM.render(
        <ChangePassForm csrf={csrf} />, document.querySelector("#changePassForm")
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
const getToken = (url) =>{
  sendAjaxCall('GET', '/getToken', null, (result) =>{
      if(window.location.href.indexOf("addRecipe") > -1){
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