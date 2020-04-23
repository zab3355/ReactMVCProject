"use strict";

//added removeBundle for removing a Recipe

var csrf = 0;

//From login bundle
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

//removing recipe from form

var removeRecipe = function removeRecipe(e) {
    e.preventDefault();

    $("#recipeMessage").animate({ width: 'hide' }, 350);

    var recipeForm = e.target;
    var getRecipeId = recipeForm.querySelector('.getRecipeId');
    var csrfSelect = recipeForm.querySelector('.csrfSelect');

    
    var formData = '_id=' + getRecipeId.value + '&_csrf=' + csrfSelect.value;

    sendAjax('POST', '/remove', formData, function () {
        loadRecipesFromServer();
    });

    return false;
};

var RecipeList = function RecipeList(props) {
    if (props.recipes.length === 0) {
        return React.createElement(
            'div',
            { className: 'recipeList' },
            React.createElement(
                'h3', { className: 'emptyRecipe' },
                'No Recipes to Delete!'
            )
        );
    }

    //create react elements
    var recipeNodes = props.recipes.map(function (recipe) {
        console.dir(recipe);
        return React.createElement(
            'div',
            { key: recipe._id, className: 'recipe' },
            React.createElement('img', { src: '/assets/img/cartIcon.png', alt: 'cart icon', className: 'cartIcon' }),
            React.createElement(
                'h3',
                { className: 'recipeName' },
                'Name: ',
                recipe.name,
                ' '
            ),
            React.createElement(
                'h3',
                { className: 'recipeAge' },
                'Age: ',
                recipe.age,
                ' '
            ),
            React.createElement(
                'form',
                { name: 'recipeForm',
                    onSubmit: removeRecipe,
                    action: '/remove',
                    method: 'POST',
                    className: 'removeRecipeForm'
                },
                React.createElement('input', { name: '_id', type: 'hidden', value: recipe._id, className: 'getRecipeId' }),
                React.createElement('input', { name: '_csrf', type: 'hidden', value: csrf, className: 'csrfSelect' }),
                React.createElement('input', { className: 'makeRecipeSubmit', type: 'submit', value: 'Delete' })
            )
        );
    });

    return React.createElement(
        'div',
        { className: 'recipeList' },
        recipeNodes
    );
};

//get Recipes from the server for deletion
var loadRecipesFromServer = function loadRecipesFromServer() {
    sendAjax('GET', '/getRecipeItems', null, function (data) {
        ReactDOM.render(React.createElement(RecipeList, { recipes: data.recipes }), document.querySelector("#recipes"));
    });
};

var setup = function setup(csrfToken) {
    csrf = csrfToken;
    ReactDOM.render(React.createElement(RecipeList, { recipes: [] }), document.querySelector("#recipes"));
    loadRecipesFromServer();
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});