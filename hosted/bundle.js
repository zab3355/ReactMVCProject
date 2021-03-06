"use strict";

//error handler
var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#errorMessage").animate({
    width: 'toggle'
  }, 350);
};

//success handler
var handleSuccess = function handleSuccess(message) {
 $("#success").text="Success!";
  $("#success").animate({
    width: 'toggle'
  }, 350);
};

//redirect
var redirect = function redirect(response) {
  $("#errorMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

//recipe handler
var handleRecipe = function handleRecipe(e) {
  e.preventDefault();
    
  //error handling
  $("#errormessage").animate({
    width: 'hide'
  }, 350);

  if ($("#recipeName").val() == '' || $("#foodCategory").val() == '' || $("#priceCategory").val() == '' || $("#tasteCategory").val() == '') {
    handleError("Please fill out each field!");
    return false;
  }

  sendAjaxCall('POST', $("#recipeForm").attr("action"), $("#recipeForm").serialize(), function () {
    //get csrf token to send to new Recipe
    var csrf = document.querySelector('#recipeForm').querySelector('#csrfToken').value;
    loadRecipesFromServer(csrf);
  });
    
  $('#tasteCategory').value = '';
  $('#priceCategory').value = '';
  $('#foodCategory').value = 'start';
    
  return false;
};

//favorite handler - functionality to tag a recipe if the user presses favorite
var handleFavorite = function handleFavorite(e) {
  e.preventDefault();
      
    var recipeForm = e.target;
    var getRecipeId = recipeForm.querySelector('.getRecipeId');
    var csrfSelect = recipeForm.querySelector('.csrfSelect');

    sendAjax('POST', '/addRecipe', formData, function () {
        loadRecipesFromServer();
    });

    return false;
};

//adding recipe form
var RecipeForm = function RecipeForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "recipeForm",
    name: "recipeForm",
    onSubmit: handleRecipe,
    action: "/addRecipe",
    method: "POST",
    className: "recipeForm"
  },/*#__PURE__*/React.createElement("input", {
    id: "recipeName",
    type: "text",
    name: "name",
    placeholder: "Recipe Name"
  }), 
/*#__PURE__*/React.createElement("select", {
    id: "foodCategory",
    name: "category",
    className: "select-option",
  },
/*#__PURE__*/React.createElement("option", {
    selected: "selected",
    disabled: "disabled",
    value: "start"
  }, "Category:"),
/*#__PURE__*/React.createElement("option", {
    value: "Chinese Cuisine"
  }, "Chinese Cuisine"),
/*#__PURE__*/React.createElement("option", {
    value: "American Cuisine"
  }, "American Cuisine"), 
/*#__PURE__*/React.createElement("option", {
    value: "Mexican Cuisine"
  }, "Mexican Cuisine"), 
/*#__PURE__*/React.createElement("option", {
    value: "Indian Cuisine"
  }, "Indian Cuisine"),
/*#__PURE__*/React.createElement("option", {
    value: "Japanese Cuisine"
  }, "Japanese Cuisine"), 
/*#__PURE__*/React.createElement("option", {
    value: "Italian Cuisine"
  }, "Italian Cuisine")), 

/*#__PURE__*/React.createElement("select", {
    id: "priceCategory",
    name: "price",
    className: "select-option",
  },
/*#__PURE__*/React.createElement("option", {
    selected: "selected",
    disabled: "disabled",
    value: "start"
  }, "Price:"),
/*#__PURE__*/React.createElement("option", {
    value: "$"
  }, "$"),
/*#__PURE__*/React.createElement("option", {
    value: "$$"
  }, "$$"), 
/*#__PURE__*/React.createElement("option", {
    value: "$$$"
  }, "$$$"), 
/*#__PURE__*/React.createElement("option", {
    value: "$$$$"
  }, "$$$$")),                                        
/*#__PURE__*/React.createElement("select", {
    id: "tasteCategory",
    name: "taste",
    className: "select-option",
  },
/*#__PURE__*/React.createElement("option", {
    selected: "selected",
    disabled: "disabled",
    value: "start"
  }, "Taste:"),
/*#__PURE__*/React.createElement("option", {
    value: "Sour"
  }, "Sour"),
/*#__PURE__*/React.createElement("option", {
    value: "Sweet"
  }, "Sweet"), 
/*#__PURE__*/React.createElement("option", {
    value: "Spicy"
  }, "Spicy"), 
/*#__PURE__*/React.createElement("option", {
    value: "Bitter"
  }, "Bitter")),                                               
/*#__PURE__*/React.createElement("input", {
    id: "csrfToken",
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeRecipeSubmit",
    type: "submit",
    value: "Add Recipe"
  }));
};

//recipe list check
var RecipeList = function RecipeList(props) {
  if (props.recipes.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "recipeList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyRecipe"
    }, "No Recipes Listed!"));
  }

//Recipe node setup
var recipeNodes = props.recipes.map(function (recipe) {
    return /*#__PURE__*/React.createElement("div", {
      key: recipe._id,
      className: "recipe",
      onSubmit: handleFavorite,
      action: "/addRecipe",
      method: "POST",
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/cartIcon.png",
      alt: "recipe cart icon",
      className: "cartIcon"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "recipeName"
    }, recipe.name),
/*#__PURE__*/React.createElement("p", {
      className: "foodCategory"
    }, "Category: ", recipe.category),
/*#__PURE__*/React.createElement("p", {
      className: "tasteCategory"
    }, "Taste: ", recipe.taste),
/*#__PURE__*/React.createElement("p", {
      className: "priceCategory"
    }, "Price: ", recipe.price),
/*#__PURE__*/React.createElement("input", {
    className: "makeFavorite",
    type: "submit",
    value: "Favorite",    
  }));
});

return /*#__PURE_a_*/React.createElement("div", {
    className: "recipeList"
  }, recipeNodes);
};

//Load recipes 
var loadRecipesFromServer = function loadRecipesFromServer(csrf) {
  sendAjaxCall('GET', '/getRecipeItems', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(RecipeList, {
      csrf: csrf,
      recipes: data.recipes
    }), document.querySelector("#recipes"));
  });
};

//setup renders
var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(RecipeForm, {
    csrf: csrf
  }), document.querySelector("#makeRecipe"));
  ReactDOM.render( /*#__PURE__*/React.createElement(RecipeList, {
    csrf: csrf,
    recipes: []
  }), document.querySelector("#recipes"));
  loadRecipesFromServer(csrf);
};

//get token 
var getToken = function getToken(url) {
  sendAjaxCall('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});

// https://medium.com/front-end-weekly/ajax-async-callback-promise-e98f8074ebd7
//Functions for Ajax Requests

var sendAjax = function sendAjax(type, action, data) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
var sendAjaxCall = function sendAjaxCall(method, action, data, callback) {
  $.ajax({
    cache: false,
    type: method,
    url: action,
    data: data,
    dataType: 'json',
    success: callback,
    error: function error(xhr, status, _error2) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

var makeAjaxCallback = function makeAjaxCallback(action, data, callback) {
  $.ajax({
    cache: false,
    type: 'POST',
    url: action,
    data: data,
    dataType: 'json',
    success: callback,
    error: function error(xhr, status, error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
