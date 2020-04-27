// Handling Password Change Form
const handleChangePass = (e) => {
    e.preventDefault();
  
  $("#errorMessage").animate({width: 'hide'}, 350);
  $("#success").animate({width: 'hide'}, 350);
  
  
    if ($('#oldPass').val() == '' || $('#newPass').val() == '' || $('#newPass2').val() == '') {
      handleError('Please fill out each field!');
      return false;
    }
  
    if ($('#newPass').val() !== $('#newPass2').val()) {
      handleError('Passwords do not match');
      return false;
    }
  
  $("#errorMessage").text(message);
  $("#errorMessage").animate({
    width: 'toggle'
  }, 350);
    /* Otherwise continue loading new page */
    makeAjaxCallback($('#changePassword').attr('action'), $('#changePassword').serialize(), (data) => {
      handleSuccess('Password changed');
    $("#success").animate({width: 'hide'}, 350);
    });
  
    return false;
  };


//Password Change Form
  const ChangePassForm = (props) => {
    // webkit text security from https://stackoverflow.com/questions/1648665/changing-the-symbols-shown-in-a-html-password-field -->
    return (
      <form id="changePassword" name="changePassword" 
      action="/changePassword" method="POST" 
      class="recipeForm" onSubmit={handleChangePass}>
        <input id="oldPass" type="text" name="oldPass" placeholder="Old Password" />
        <input id="newPass" type="text" name="newPass" placeholder="New Password" />
        <input id="newPass2" type="text" name="newPass2" placeholder="Repeat New Password" />
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Change Password" />
    </form>
    )
  };

//Password Change Form Setup
const setupPassChangeForm = function(csrf) {
    ReactDOM.render(
        <ChangePassForm csrf={csrf} />, document.querySelector("#changePassForm")
    );
};
