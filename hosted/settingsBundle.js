"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#errorMessage").fadeIn(350);
};

var handleSuccess = function handleSuccess(message) {
  $('#success').text = message;
  $('#success').fadeIn(200);
};


var handleChangePass = function handleChangePass(e) {
  e.preventDefault();

  if ($('#oldPass').val() == '' || $('#newPass').val() == '' || $('#newPass2').val() == '') {
    handleError('All fields are required');
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

    
  /* Otherwise continue loading new page */

  sendAjaxWithCallback($('#changePassword').attr('action'), $('#changePassword').serialize(), function (data) {
    handleSuccess('Password changed');
  });
  return false;
};


var ChangePassForm = function ChangePassForm(props) {
  // webkit text security from https://stackoverflow.com/questions/1648665/changing-the-symbols-shown-in-a-html-password-field -->
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


var setupPassChangeForm = function setupPassChangeForm(csrf) {
  ReactDOM.render(React.createElement(ChangePassForm, {
    csrf: csrf
  }), document.querySelector("#changePassForm"));
};

var setupAccountPage = function setupAccountPage(csrf) {

  var password = document.querySelector("#passwordContainer");
  if (password) {
    //renders form
    ReactDOM.render(React.createElement(PasswordForm, { csrf: csrf }), document.querySelector("#updateForm"));
  }
};

var getToken = function getToken(url) {
  sendGenericAjax('GET', '/getToken', null, function (result) {
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

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#recipeMessage").animate({
    width: 'toggle'
  }, 350);
};

var handleSuccess = function handleSuccess(message) {
  $('#success').text = message;
  $('#success').fadeIn(200);
};

var redirect = function redirect(response) {
  $("#recipeMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

//Functions for Ajax Requests

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
var sendGenericAjax = function sendGenericAjax(method, action, data, callback) {
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

var sendAjaxWithCallback = function sendAjaxWithCallback(action, data, callback) {
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
