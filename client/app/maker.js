const handleRecipe = (e) =>{
  e.preventDefault();
  
  $("#recipeMessage").animate({width: 'hide'}, 350);
  
  if($("#recipeName").val() == '' || $("#foodCategory").val() == '' || $("#tasteCategory").val() == '' || $("#priceCategory").val() == '' ) {
    handleError("All fields are required!");
    return false;
  }
  
  sendGenericAjax('POST', $("#recipeForm").attr("action"), $("#recipeForm").serialize(), function(){
    
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
            <option value="Chinese">Chinese</option>
            <option value="American">American</option>
            <option value="Mexican">Mexican</option>
            <option value="Indian">Indian</option>
            <option value="Indian">Indian</option>
            <option value="Japanese">Japanese</option>
            <option value="Italian">Italian</option>
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
      <div key={recipe._id} className="recipe">
        <img src="/assets/img/cartIcon.png" alt="recipe cart icon" className="cartIcon" />
        <h3 className="recipeName">Recipe Name: {recipe.name}</h3> 
        <p className="foodCategory">Category: {recipe.category}</p>
        <p className="tasteCategory">Taste: {recipe.taste}</p>
        <p className="priceCategory">Price: {recipe.price}</p>
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
    $('#error').fadeOut(200);
  
    if ($('#oldPass').val() == '' || $('#newPass').val() == '' || $('#newPass2').val() == '') {
      handleError('All fields are required');
      return false;
    }
  
    if ($('#newPass').val() !== $('#newPass2').val()) {
      handleError('Passwords do not match');
      return false;
    }
  
    $('#error').fadeIn(200);
    /* Otherwise continue loading new page */
    sendAjax($('#changePassword').attr('action'), $('#changePassword').serialize(), (data) => {
      handleSuccess('Password changed');
    $("#success").animate({width: 'hide'}, 350);
    });
  
    return false;
  };


//Password Change Form
  const ChangePassForm = (props) => {
    // webkit text security from https://stackoverflow.com/questions/1648665/changing-the-symbols-shown-in-a-html-password-field -->
    return (
      <form id="changePassword" name="changePassword" 
      action="/changePassword" method="POST" 
      class="recipeForm" onSubmit={handleChangePass}>
        <input id="oldPass" type="text" name="oldPass" placeholder="Old Password" />
        <input id="newPass" type="text" name="newPass" placeholder="New Password" />
        <input id="newPass2" type="text" name="newPass2" placeholder="Repeat New Password" />
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

const getToken = (url) =>{
  sendAjax('GET', '/getToken', null, (result) =>{
    
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