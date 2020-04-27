/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
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

const redirect = (response) => {
  $('#error').fadeOut(200);
  window.location = response.redirect;
};

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