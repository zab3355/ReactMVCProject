"use strict";

var handleRecipe = function handleRecipe(e) {
  e.preventDefault();
  $("#recipeMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#recipeName").val() == '' || $("#foodCategory").val() == '' || $("#tasteCategory").val() == '' || $("#priceCategory").val() == '') {
    handleError("All fields are required!");
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

var RecipeForm = function RecipeForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "recipeForm",
    name: "recipeForm",
    onSubmit: handleRecipe,
    action: "/addRecipe",
    method: "POST",
    className: "recipeForm"
  }, /*#__PURE__*/React.createElement("input", {
    id: "recipeName",
    type: "text",
    name: "name",
    placeholder: "Recipe Name"
  }), /*#__PURE__*/React.createElement("select", {
    className: "select-option",
    id: "foodCategory",
    name: "category"
  }, /*#__PURE__*/React.createElement("option", {
    selected: "selected",
    disabled: "disabled",
    value: "start"
  }, "Category: "), /*#__PURE__*/React.createElement("option", {
    value: "Chinese"
  }, "Chinese"), /*#__PURE__*/React.createElement("option", {
    value: "American"
  }, "American"), /*#__PURE__*/React.createElement("option", {
    value: "Mexican"
  }, "Mexican"), /*#__PURE__*/React.createElement("option", {
    value: "Indian"
  }, "Indian"), /*#__PURE__*/React.createElement("option", {
    value: "Indian"
  }, "Indian"), /*#__PURE__*/React.createElement("option", {
    value: "Japanese"
  }, "Japanese"), /*#__PURE__*/React.createElement("option", {
    value: "Italian"
  }, "Italian")), /*#__PURE__*/React.createElement("select", {
    className: "select-option",
    id: "priceCateogry",
    name: "price"
  }, /*#__PURE__*/React.createElement("option", {
    selected: "selected",
    disabled: "disabled",
    value: "start"
  }, "Price: "), /*#__PURE__*/React.createElement("option", {
    value: "$"
  }, "$"), /*#__PURE__*/React.createElement("option", {
    value: "$$"
  }, "$$"), /*#__PURE__*/React.createElement("option", {
    value: "$$$"
  }, "$$$"), /*#__PURE__*/React.createElement("option", {
    value: "$$$$"
  }, "$$$$")), /*#__PURE__*/React.createElement("select", {
    className: "select-option",
    id: "tasteCategory",
    name: "taste"
  }, /*#__PURE__*/React.createElement("option", {
    selected: "selected",
    disabled: "disabled",
    value: "start"
  }, "Price: "), /*#__PURE__*/React.createElement("option", {
    value: "Sour"
  }, "Sour"), /*#__PURE__*/React.createElement("option", {
    value: "Sweet"
  }, "Sweet"), /*#__PURE__*/React.createElement("option", {
    value: "Spicy"
  }, "Spicy"), /*#__PURE__*/React.createElement("option", {
    value: "Bitter"
  }, "Bitter")), /*#__PURE__*/React.createElement("input", {
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

  ;
  var recipeNodes = props.recipes.map(function (recipe) {
    return /*#__PURE__*/React.createElement("form", {
      id: "recipeForm",
      name: "recipeForm",
      onSubmit: handleRecipe,
      action: "/information",
      method: "POST",
      className: "recipeForm"
    }, /*#__PURE__*/React.createElement("div", {
      key: recipe._id,
      className: "recipe"
    }, /*#__PURE__*/React.createElement("div", {
      className: "recipeNode",
      id: "recipeNodeShow",
      onclick: "showRecipe()"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/cartIcon.png",
      alt: "recipe cart icon",
      className: "cartIcon"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "recipeName"
    }, "Recipe Name: ", recipe.name), /*#__PURE__*/React.createElement("p", {
      className: "foodCategory"
    }, "Category: ", recipe.category), /*#__PURE__*/React.createElement("p", {
      className: "tasteCategory"
    }, "Taste: ", recipe.taste), /*#__PURE__*/React.createElement("p", {
      className: "priceCategory"
    }, "Price: ", recipe.price), /*#__PURE__*/React.createElement("input", {
      className: "makeRecipeSubmit",
      type: "submit",
      value: "Information"
    }))));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "recipeList"
  }, recipeNodes);
}; // Handling Password Change Form


var handleChangePass = function handleChangePass(e) {
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

  makeAjaxCallback($('#changePassword').attr('action'), $('#changePassword').serialize(), function (data) {
    handleSuccess('Password changed');
    $("#success").animate({
      width: 'hide'
    }, 350);
  });
  return false;
}; //Password Change Form


var ChangePassForm = function ChangePassForm(props) {
  // webkit text security from https://stackoverflow.com/questions/1648665/changing-the-symbols-shown-in-a-html-password-field -->
  return /*#__PURE__*/React.createElement("form", {
    id: "changePassword",
    name: "changePassword",
    action: "/changePassword",
    method: "POST",
    "class": "recipeForm",
    onSubmit: handleChangePass
  }, /*#__PURE__*/React.createElement("input", {
    id: "oldPass",
    type: "text",
    name: "oldPass",
    placeholder: "Old Password"
  }), /*#__PURE__*/React.createElement("input", {
    id: "newPass",
    type: "text",
    name: "newPass",
    placeholder: "New Password"
  }), /*#__PURE__*/React.createElement("input", {
    id: "newPass2",
    type: "text",
    name: "newPass2",
    placeholder: "Repeat New Password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Change Password"
  }));
}; //Password Change Form Setup


var setupPassChangeForm = function setupPassChangeForm(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ChangePassForm, {
    csrf: csrf
  }), document.querySelector("#changePassForm"));
};

var loadRecipesFromServer = function loadRecipesFromServer(csrf) {
  sendAjaxCall('GET', '/getRecipeItems', null, function (data) {
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

var getToken = function getToken(url) {
  sendAjaxCall('GET', '/getToken', null, function (result) {
    if (window.location.href.indexOf("maker") > -1) {
      setup(result.csrfToken);
    }

    if (window.location.href.indexOf("account") > -1) {
      setupPassChangeForm(result.csrfToken);
    }
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

/* eslint-disable no-undef */

/* eslint-disable linebreak-style */
var handleError = function handleError(message) {
  $('#error').text = message;
  $('#error').fadeIn(200);
};

var handleSuccess = function handleSuccess(message) {
  $('#success').text = message;
  $('#success').fadeIn(200);
};

var redirect = function redirect(response) {
  $('#error').fadeOut(200);
  window.location = response.redirect;
};
/* Sends Ajax request */


var sendAjax = function sendAjax(action, data) {
  $.ajax({
    cache: false,
    type: 'POST',
    url: action,
    data: data,
    dataType: 'json',
    success: function success(result, status, xhr) {
      $('#error').fadeOut(200);
      window.location = result.redirect;
    },
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
