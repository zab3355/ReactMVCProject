/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const handleError = (message) => {
  $('#error').text = message;
  $('#error').fadeIn(200);
};

const handleSuccess = (message) => {
  $('#success').text = message;
  $('#success').fadeIn(200);
};

const redirect = (response) => {
  $('#error').fadeOut(200);
  window.location = response.redirect;
};

/* Sends Ajax request */
const sendAjax = (action, data) => {
  $.ajax({
    cache: false,
    type: 'POST',
    url: action,
    data,
    dataType: 'json',
    success: (result, status, xhr) => {
      $('#error').fadeOut(200);

      window.location = result.redirect;
    },
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    },
  });
};