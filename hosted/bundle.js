"use strict";

var handleRecipe = function handleRecipe(e) {
  e.preventDefault();
  $("#recipeMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#recipeName").val() == '' || $("#recipeAge").val() == '') {
    handleError("All fields are required!");
    return false;
  }

  sendAjax('POST', $("#recipeForm").attr("action"), $("#recipeForm").serialize(), function () {
    //get csrf token to send to new Recipe
    var csrf = document.querySelector('#recipeForm').querySelector('#csrfToken').value;
    loadRecipesFromServer(csrf);
  });
  return false;
};

var RecipeForm = function RecipeForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "recipeForm",
    name: "recipeForm",
    onSubmit: handleRecipe,
    action: "/addRecipe",
    method: "POST",
    className: "recipeForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "recipeName",
    type: "text",
    name: "name",
    placeholder: "Recipe Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "age"
  }, "Age: "), /*#__PURE__*/React.createElement("input", {
    id: "recipeAge",
    type: "text",
    name: "age",
    placeholder: "Recipe Age"
  }), 

/*#__PURE__*/React.createElement("select", {
    id: "foodCategory",
    name: "category",
  },
/*#__PURE__*/React.createElement("option", {
    selected: "selected",
    disabled: "disabled",
    value: "start"
  }, "Food Category:"),
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

var RecipeList = function RecipeList(props) {
  if (props.recipes.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "recipeList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyRecipe"
    }, "No Recipes Listed!"));
  }

  var recipeNodes = props.recipes.map(function (recipe) {
    return /*#__PURE__*/React.createElement("div", {
      key: recipe._id,
      className: "recipe"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/cartIcon.png",
      alt: "recipe cart icon",
      className: "cartIcon"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "recipeName"
    }, "Recipe Name: ", recipe.name), /*#__PURE__*/React.createElement("h3", {
      className: "recipeAge"
    }, "Age: ", recipe.age),
/*#__PURE__*/React.createElement("h3", {
      className: "foodCategory"
    }, "Category: ", recipe.category),
/*#__PURE__*/React.createElement("h3", {
      className: "tasteCategory"
    }, "Taste: ", recipe.taste),
/*#__PURE__*/React.createElement("h3", {
      className: "priceCategory"
    }, "Price: ", recipe.price));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "recipeList"
  }, recipeNodes);
};

var loadRecipesFromServer = function loadRecipesFromServer(csrf) {
  sendAjax('GET', '/getRecipeItems', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(RecipeList, {
      csrf: csrf,
      recipes: data.recipes
    }), document.querySelector("#recipes"));
  });
};

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

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#recipeMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#recipeMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
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