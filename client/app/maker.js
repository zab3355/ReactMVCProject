const handleRecipe = (e) =>{
  e.preventDefault();
  
  $("#recipeMessage").animate({width: 'hide'}, 350);
  
  if($("#recipeName").val() == '' || $("#foodCategory").val() == '' || $("#tasteCategory").val() == '' || $("#priceCategory").val() == '' ) {
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
    <input id="recipeName" type="text" name="name" placeholder="Recipe Name" />
    <input id="recipeAge" type="text" name="age" placeholder="Recipe Age" />
    <select className="selectBox" id="reactionLevel" name="level">
            <option selected="selected" disabled="disabled" value="start">Rate the reaction:</option>
    <input id="foodCategory" type="text" name="category" placeholder="Food Category" />
    <label htmlFor="price">Price: </label>
    <input id="priceCategory" type="text" name="price" placeholder="Price" />
    <label htmlFor="taste">Taste: </label>
    <input id="tasteCategory" type="text" name="taste" placeholder="Taste" />
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
        <h3 className="recipeAge">Age: {recipe.age}</h3>  
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


  const ChangePassForm = (props) => {
    // webkit text security from https://stackoverflow.com/questions/1648665/changing-the-symbols-shown-in-a-html-password-field -->
    return (
      <form id="changePassword" name="changePassword" 
      action="/changePassword" method="POST" 
      class="mealForm" onSubmit={handleChangePass}>
        <input className="textBox add" id="oldPass" type="text" name="oldPass" placeholder="Old Password" />
        <input className="textBox add" id="newPass" type="text" name="newPass" placeholder="New Password" />
        <input className="textBox add" id="newPass2" type="text" name="newPass2" placeholder="Repeat New Password" />
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Change Password" />
        <div className="alert alert-danger" role="alert" id="error">Error</div>
        <div className="alert alert-success" role="alert" id="success">Success</div>
    </form>
    )
  };

const setupPassChangeForm = function(csrf) {
    ReactDOM.render(
        <ChangePassForm csrf={csrf} />, document.querySelector("#changePassForm")
    ); 
};


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
    });
  
    return false;
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