"use strict";

//error handler
var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#recipeMessage").animate({
    width: 'toggle'
  }, 350);
};

//success handler
var handleSuccess = function handleSuccess(message) {
  $("#success");
  $("#success").animate({
    width: 'toggle'
  }, 350);
};

//handler for Change Password
var handleChangePass = function handleChangePass(e) {
  e.preventDefault();

//error handling for Change Password
  if ($('#oldPass').val() == '' || $('#newPass').val() == '' || $('#newPass2').val() == '') {
    handleError('Please fill out each field!');
    return false;
  }

  if ($('#newPass').val() !== $('#newPass2').val()) {
    handleError('Passwords do not match');
    return false;
  }

 if ($('#oldPass').val() == $('#newPass').val()) {
    handleError('New Password cannot be the same as your current one!');
    return false;
  }

  if ($('#oldPass').val() == $('#newPass2').val()) {
    handleSuccess('Password Updated');
    alert('Password Changed');
    return true;
  }

  //Callback for change password
  makeAjaxCallback($('#changePassword').attr('action'), $('#changePassword').serialize(), function (data) {
    handleSuccess('Password changed');
  });
  return false;
};

//change Password Form
var ChangePassForm = function ChangePassForm(props) {
  return React.createElement("form", {
    id: "changePassword",
    name: "changePassword",
    action: "/changePassword",
    method: "POST",
    "class": "recipeForm",
    onSubmit: handleChangePass
  }, /*#__PURE__*/React.createElement("h3", {
    htmlFor: "oldPass"
  }, "Old Password: "),
    React.createElement("input", {
    id: "oldPass",
    type: "password",
    name: "oldPass",
    placeholder: "Old Password"
  }),  
/*#__PURE__*/React.createElement("h3", {
    htmlFor: "newPass"
  }, "New Password: "),
    React.createElement("input", {
    id: "newPass",
    type: "password",
    name: "newPass",
    placeholder: "New Password"
  }),/*#__PURE__*/React.createElement("h3", {
    htmlFor: "newPass2"
  }, "Retype Password: "), React.createElement("input", {
    id: "newPass2",
    type: "password",
    name: "newPass2",
    placeholder: "Retype New Password"
  }), React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Change Password"
  }));
};

//setup change password form render
var setupPassChangeForm = function setupPassChangeForm(csrf) {
  ReactDOM.render(React.createElement(ChangePassForm, {
    csrf: csrf
  }), document.querySelector("#changePassForm"));
};

//setting up page for Change Password - render form
var setupAccountPage = function setupAccountPage(csrf) {

  var password = document.querySelector("#passwordContainer");
  
    if (password) {             
        ReactDOM.render(React.createElement(PasswordForm, { csrf: csrf }), document.querySelector("#updateForm"));
  }
};

//based upon URL, will setup specific renders
var getToken = function getToken(url) {
  sendAjaxCall('GET', '/getToken', null, function (result) {
     if (window.location.href.indexOf("addRecipe") > -1) {
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

//redirect 
var redirect = function redirect(response) {
  $("#recipeMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

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