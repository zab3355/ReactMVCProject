"use strict";

var handlePassChange = function handlePassChange(e) {
  e.preventDefault();

  $("#errorContainer").animate({ width: 'hide' }, 350);

  if ($("#oldPass").val() == '' || $("#newPass").val() == '' || $("#newPass2").val() == '') {
    handleError("All fields are required!");
    return false;
  }

  sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);

  return false;
};


var PasswordForm = function PasswordForm(props) {
 //renders form
  return React.createElement(
    "form",
    { id: "passwordForm",
      name: "passwordForm",
      onSubmit: handlePassChange,
      action: "/changePassword",
      method: "POST",
      className: "passwordForm" },
    React.createElement(
      "div",
      { id: "changeForm" },
      React.createElement(
        "h3",
        { id: "change" },
        "Change Password:"
      ),
      React.createElement("input", { id: "oldPass", type: "password", name: "oldPass", placeholder: "Old Password" }),
      React.createElement("input", { id: "newPass", type: "password", name: "newPass", placeholder: "New Password" }),
      React.createElement("input", { id: "newPass2", type: "password", name: "newPass2", placeholder: "Re-type Password" }),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
      React.createElement("input", { className: "changePassword", type: "submit", value: "Update" }),
      React.createElement(
        "div",
        { id: "passwordInfo" },
        React.createElement(
          "p",
          null,
          "In order to change your password, enter in your old one, then enter in your new password, and click the update button."
        ),
        React.createElement(
          "p",
          null,
          React.createElement(
            "strong",
            null,
            "PLEASE NOTE:"
          ),
          " Signout is automatic and ",
          React.createElement(
            "strong",
            null,
            "WILL"
          ),
          " occur when the password is updated!"
        )
      )
    )
  );
};

var setupPassChangeForm = function setupPassChangeForm(csrf) {
  ReactDOM.render(React.createElement(ChangePassForm, {
    csrf: csrf
  }), document.querySelector("#changePassForm"));
  }
};

var setupAccountPage = function setupAccountPage(csrf) {

  var password = document.querySelector("#passwordContainer");
  if (password) {
    //renders form
    ReactDOM.render(React.createElement(PasswordForm, { csrf: csrf }), document.querySelector("#updateForm"));
  }
};

var getAccountToken = function getAccountToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setupAccountPage(result.csrfToken);
  });
};

$(document).ready(function () {
  getAccountToken();
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

