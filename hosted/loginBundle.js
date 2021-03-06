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
  $("#success");
  $("#success").animate({
    width: 'toggle'
  }, 150);
};

//Login handler
var handleLogin = function handleLogin(e) {
  e.preventDefault();
  
  //error handling
  $("#errorMessage").animate({
    width: 'hide'
  }, 150);

//if user and pass fields are empty
  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("Username or password is empty!");
    return false;
  }

  console.log($("input[name=_csrf]").val());
  sendAjaxCall('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
};

//Signup Handler
var handleSignup = function handleSignup(e) {
  e.preventDefault();
  //error handling
  $("#errorMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("Please fill out each field!");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match!");
    return false;
  }

  sendAjaxCall('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  return false;
};

//about Handler
var handleAbout = function handleAbout(e) {
  e.preventDefault();
  $("#errorMessage").animate({
    width: 'hide'
  }, 350);
};

//login window setup
var LoginWindow = function LoginWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "loginForm",
    name: "loginForm",
    onSubmit: handleLogin,
    action: "/login",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: "), /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "username"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Sign in"
  }));
};

//signup window setup
var SignupWindow = function SignupWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "signupForm",
    name: "signupForm",
    onSubmit: handleSignup,
    action: "/signup",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: "), /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "username"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass2"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass2",
    type: "password",
    name: "pass2",
    placeholder: "retype password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Sign Up"
  }));
};

//about window setup
var AboutWindow = function AboutWindow(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "actionSection",
    name: "aboutSection",
    action: "/about",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("h1",  {
    htmlFor: "title",
    id: "titleAbout"
  }, "About Recipe Resort"), 
     /*#__PURE__*/React.createElement("p", {
    htmlFor: "title",
    id: "titleCaption"
  }, "Welcome to Recipe Resort! Here you and other users can create and share your own recipes online! To get started please Signup, create a username and password, and then Login! After this, you will be able to create a recipe, store it into our database, and put whatever information you'd like on that Recipe. What are you waiting for? Get started and share your recipe today!"),
);
};

//creating login window render
var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

//creating signup window render
var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

//creating About Window render
var createAboutWindow = function createAboutWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(AboutWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

//setup function
var setup = function setup(csrf) {
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton");
  var aboutButton = document.querySelector("#aboutButton");
  aboutButton.addEventListener("click", function (e) {
    e.preventDefault();
    createAboutWindow(csrf);
    return false;
  });
  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  createLoginWindow(csrf); 
};

//get token call
var getToken = function getToken() {
  sendAjaxCall('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});

//redirect
var redirect = function redirect(response) {
  $("#errorMessage").animate({
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